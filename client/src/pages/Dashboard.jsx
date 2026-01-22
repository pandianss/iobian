// ... imports ...
import React, { useState, Suspense, useEffect } from 'react';
import {
    LayoutDashboard,
    Wrench,
    FileText,
    LineChart,
    Package,
    Map as MapIcon,
    Globe,
    Building2,
    Users,
    ShieldCheck,
    BadgeCheck,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Clock,
    Layers,
    Megaphone,
    Percent,
    Calculator,
    Settings
} from 'lucide-react';
import { UI_TEXT } from '../constants/uiText';

// Lazy Load Modules

const Scorecard = React.lazy(() => import('../modules/PMS/Scorecard'));
const InventoryManager = React.lazy(() => import('../modules/Inventory/InventoryManager'));
const RegionManager = React.lazy(() => import('../modules/Admin/RegionManager'));
const BranchManager = React.lazy(() => import('../modules/Admin/BranchManager'));
// BranchOpeningSurvey integrated into DocumentGenerator
const CampaignManager = React.lazy(() => import('../mis/Campaigns'));
// RoCommunication integrated into DocumentGenerator
const StaffManager = React.lazy(() => import('../modules/HR/StaffManager'));
const RestorationVault = React.lazy(() => import('../modules/Admin/RestorationVault'));
const DesignationManager = React.lazy(() => import('../modules/Admin/DesignationManager'));
const PlanningDashboard = React.lazy(() => import('../mis/Planning'));
// JoiningOfferGenerator integrated into DocumentGenerator
// const RetirementGenerator = React.lazy(() => import('../modules/HR/RetirementGenerator')); // Integrated into DocumentGenerator
const DepartmentManager = React.lazy(() => import('../modules/Admin/DepartmentManager'));
const InterestRateManager = React.lazy(() => import('../mis/Planning/InterestRateManager'));
const InterestWorksheet = React.lazy(() => import('../mis/Planning/InterestWorksheet'));
const DindigulLanding = React.lazy(() => import('../modules/RO/DindigulRegion/DindigulLanding'));
const DocumentGenerator = React.lazy(() => import('../modules/CTE/DocumentGenerator'));
const ConductDashboard = React.lazy(() => import('../modules/Conduct/ConductDashboard'));
const SystemConfiguration = React.lazy(() => import('../modules/Admin/SystemConfiguration'));

const Dashboard = ({ user, onLogout, timeLeft }) => {
    const [activeView, setActiveView] = useState('dashboard');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    useEffect(() => {
        if (user) {
            let title = 'IOBIAN';
            if (user.office_level === 'CO') {
                title = 'IOBIAN - CO Workspace';
            } else if (user.office_level === 'RO') {
                const region = user.region_name || user.linked_region_code;
                title = region ? `IOBIAN - RO ${region} Workspace` : 'IOBIAN - RO Workspace';
            } else if (user.office_level === 'Branch') {
                const branch = user.branch_name || user.linked_branch_code;
                title = branch ? `IOBIAN - ${branch} Workspace` : 'IOBIAN - Branch Workspace';
            }
            document.title = title;
        } else {
            document.title = 'IOBIAN';
        }
    }, [user]);

    const renderContent = () => {
        switch (activeView) {
            // ... existing cases ...
            // ...
            case 'dashboard':
                return (
                    // ... dashboard content
                    <div className="flex flex-col gap-6">
                        <div className="card">
                            <h3>{UI_TEXT.HEADER.WELCOME}, {user.full_name}</h3>
                            <p className="text-text-secondary">
                                {UI_TEXT.HEADER.LOGGED_IN_AS} <strong>{user.role}</strong>.
                                {user.linked_branch_code && <span> {UI_TEXT.HEADER.MANAGING_BRANCH}: <strong>{user.linked_branch_code}</strong></span>}
                            </p>
                        </div>
                        {/* ... */}
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                            <div className="card">
                                <h4>{UI_TEXT.HEADER.PENDING_ACTIONS}</h4>
                                <div className="text-3xl font-bold text-secondary-color">12</div>
                                <p className="text-sm text-text-secondary">{UI_TEXT.HEADER.REQUESTS_AWAITING}</p>
                            </div>

                            <div className="card">
                                <h4>{UI_TEXT.HEADER.PERFORMANCE_SCORE}</h4>
                                <div className="text-3xl font-bold text-accent-color">85/100</div>
                                <p className="text-sm text-text-secondary">{UI_TEXT.HEADER.UPDATED_TODAY}</p>
                            </div>
                        </div>
                    </div>
                );
            // ... strict cases ...

            case 'pms':
                return <Scorecard user={user} divisionId={user.dept_id} />;
            case 'inventory':
                return <InventoryManager />;
            case 'region_manager':
                return <RegionManager />;
            case 'branch_manager':
                return <BranchManager user={user} />;
            case 'staff_manager':
                return <StaffManager user={user} />;
            case 'repair_vault':
                return <RestorationVault />;
            case 'designation_manager':
                return <DesignationManager user={user} />;
            case 'planning':
                return <PlanningDashboard user={user} />;
            // joining_offer_letter integrated into document_generator
            case 'campaign_manager':
                return <CampaignManager user={user} />;
            // communication integrated into document_generator
            case 'department_manager':
                return <DepartmentManager />;
            case 'interest_rates':
                return <InterestRateManager user={user} />;
            case 'interest_worksheet':
                return <InterestWorksheet user={user} />;
            case 'dindigul_region':
                return <DindigulLanding />;
            case 'document_generator':
                return <DocumentGenerator user={user} branchCode={user.linked_branch_code} branchName={user.branch_name} />;
            case 'conduct':
                return <ConductDashboard />;
            case 'system_config':
                return <SystemConfiguration />;
            default:
                return <div>Module Under Construction</div>;
        }
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* Top Navigation */}
            {/* Top Navigation */}
            <header className="dashboard-header">
                <div className="header-brand">
                    <img src="/IOB_LOGO_2025.svg" alt="IOBIAN" />
                    <div className="header-brand-text">
                        {user.office_level === 'CO' ? 'Central Office' : user.office_level === 'RO' ? 'Regional Office' : user.office_level} Workspace
                    </div>
                </div>
                <div className="header-controls">
                    <div className="header-pill">
                        <Clock size={14} />
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </div>
                    <span className="text-white font-bold">{user.full_name}</span>
                    <button onClick={() => setActiveView('system_config')} className="header-icon-btn" title={UI_TEXT.HEADER.SYSTEM_CONFIG}>
                        <Settings size={18} />
                    </button>
                    <button onClick={onLogout} className="header-logout-btn">
                        <LogOut size={16} /> {UI_TEXT.HEADER.LOGOUT}
                    </button>
                </div>
            </header>

            <main className={`flex-1 p-8 grid gap-8 overflow-hidden min-h-0 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'grid-cols-[80px_1fr]' : 'grid-cols-[250px_1fr]'}`}>
                {/* Sidebar */}
                {/* Sidebar */}
                <aside className={`card h-full transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden ${isSidebarCollapsed ? 'w-[80px] p-2' : 'w-full p-6'}`}>
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-border-color">
                        {!isSidebarCollapsed && <h4 className="m-0 text-text-secondary">{UI_TEXT.MENU.HEADER}</h4>}
                        <button
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            className={`bg-transparent border-none cursor-pointer text-text-secondary flex justify-center w-full hover:text-primary-color transition-colors ${isSidebarCollapsed ? 'mx-auto' : ''}`}
                            title={isSidebarCollapsed ? "Expand" : "Collapse"}
                        >
                            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        </button>
                    </div>

                    <ul className="list-none p-0 m-0">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, roles: [] },
                            { id: 'service_requests', label: 'Service Requests', icon: <Wrench size={20} />, roles: [] },

                            { id: 'pms', label: 'Performance (PMS)', icon: <LineChart size={20} />, roles: [] },
                            { id: 'inventory', label: 'Inventory', icon: <Package size={20} />, roles: [] },
                            { id: 'interest_rates', label: 'Interest Rates', icon: <Percent size={20} />, roles: ['SuperAdmin', 'CO_Planning', 'RO', 'Branch'] },
                            { id: 'region_manager', label: 'Region Management', icon: <Globe size={20} />, roles: ['SuperAdmin', 'CO_Planning'] },
                            { id: 'branch_manager', label: 'Branch Network', icon: <Building2 size={20} />, roles: ['SuperAdmin', 'CO_Planning', 'RO', 'Branch'] },
                            { id: 'staff_manager', label: 'Staff Management', icon: <Users size={20} />, roles: ['SuperAdmin', 'RO', 'CO'] }, // Updated roles
                            { id: 'campaign_manager', label: 'Campaigns', icon: <Megaphone size={20} />, roles: ['SuperAdmin', 'RO'] },
                            { id: 'repair_vault', label: 'Restoration & Vault', icon: <ShieldCheck size={20} />, roles: ['SuperAdmin', 'CO_Gad'] },
                            { id: 'designation_manager', label: 'Designations', icon: <BadgeCheck size={20} />, roles: ['SuperAdmin', 'CO_HRD'] },
                            // { id: 'joining_offer_letter', label: 'Joining Offer Letter', icon: <FileText size={20} />, roles: ['SuperAdmin', 'CO_HRD'] }, // Moved to Document Generator
                            // { id: 'retirement_generator', label: 'Retirement Relieving', icon: <FileText size={20} />, roles: ['SuperAdmin', 'RO', 'CO', 'CO_HRD'] }, // Moved to Document Generator
                            { id: 'department_manager', label: 'Departments', icon: <Layers size={20} />, roles: ['SuperAdmin', 'RO'] },
                            { id: 'document_generator', label: 'Document Generator', icon: <FileText size={20} />, roles: ['SuperAdmin', 'RO', 'Branch'] },
                            { id: 'conduct', label: 'Conduct & Discipline', icon: <ShieldCheck size={20} />, roles: ['SuperAdmin', 'RO', 'Branch', 'CO'] },
                            { id: 'dindigul_region', label: 'Dindigul Region', icon: <MapIcon size={20} />, roles: ['SuperAdmin', 'RO', 'Branch'] },
                            { id: 'system_config', label: 'System Configuration', icon: <Settings size={20} />, roles: ['SuperAdmin', 'RO'] }
                        ].map(item => {
                            if (item.roles.length > 0 && !item.roles.includes(user.role)) return null;

                            const isActive = activeView === item.id;
                            return (
                                <li
                                    key={item.id}
                                    onClick={() => setActiveView(item.id)}
                                    title={isSidebarCollapsed ? item.label : ''}
                                    className={`
                                        p-3 cursor-pointer flex items-center gap-3 rounded-lg mb-1 transition-colors duration-200
                                        ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}
                                        ${isActive
                                            ? 'bg-primary-color/10 text-primary-color font-bold'
                                            : 'text-text-secondary hover:bg-slate-50 hover:text-text-primary'}
                                    `}
                                >
                                    <span className="flex items-center">{item.icon}</span>
                                    {!isSidebarCollapsed && <span>{item.label}</span>}
                                </li>
                            );
                        })}
                    </ul>
                </aside>



                {/* content area */}
                <div className="dashboard-content-area">
                    <Suspense fallback={<div className="loading-fallback">Loading Module...</div>}>
                        {renderContent()}
                    </Suspense>
                </div>
            </main>
        </div>
    );
};

import { DataProvider } from '../context/DataContext';

const DashboardWithProvider = (props) => (
    <DataProvider>
        <Dashboard {...props} />
    </DataProvider>
);

export default DashboardWithProvider;
