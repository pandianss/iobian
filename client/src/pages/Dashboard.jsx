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
    Calculator
} from 'lucide-react';

// Lazy Load Modules
const DocumentGenerator = React.lazy(() => import('../modules/CTE/DocumentGenerator'));
const Scorecard = React.lazy(() => import('../modules/PMS/Scorecard'));
const InventoryManager = React.lazy(() => import('../modules/Inventory/InventoryManager'));
const RegionManager = React.lazy(() => import('../modules/Admin/RegionManager'));
const BranchManager = React.lazy(() => import('../modules/Admin/BranchManager'));
const BranchOpeningSurvey = React.lazy(() => import('../modules/Planning/BranchOpeningSurvey')); // Added
const CampaignManager = React.lazy(() => import('../modules/RO/CampaignManager'));
const RoCommunication = React.lazy(() => import('../modules/RO/Communication/ROCommunication'));
const StaffManager = React.lazy(() => import('../modules/HR/StaffManager'));
const RestorationVault = React.lazy(() => import('../modules/Admin/RestorationVault'));
const DesignationManager = React.lazy(() => import('../modules/Admin/DesignationManager'));
const PlanningDashboard = React.lazy(() => import('../modules/Planning/PlanningDashboard'));
const JoiningOfferGenerator = React.lazy(() => import('../modules/HR/JoiningOfferGenerator'));
// const RetirementGenerator = React.lazy(() => import('../modules/HR/RetirementGenerator')); // Integrated into DocumentGenerator
const DepartmentManager = React.lazy(() => import('../modules/Admin/DepartmentManager'));
const InterestRateManager = React.lazy(() => import('../modules/Planning/InterestRateManager'));
const InterestWorksheet = React.lazy(() => import('../modules/Planning/InterestWorksheet'));
const DindigulLanding = React.lazy(() => import('../modules/RO/DindigulRegion/DindigulLanding'));

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
            case 'department_manager':
                return <DepartmentManager />;
            // ...
            case 'dashboard':
                return (
                    // ... dashboard content
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="card">
                            <h3>Welcome back, {user.full_name}</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                You are logged in as <strong>{user.role}</strong>.
                                {user.linked_branch_code && <span> Managing Branch: <strong>{user.linked_branch_code}</strong></span>}
                            </p>
                        </div>
                        {/* ... */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            <div className="card">
                                <h4>Pending Actions</h4>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-color)' }}>12</div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Requests awaiting your approval</p>
                            </div>

                            <div className="card">
                                <h4>Performance Score</h4>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>85/100</div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Updated today</p>
                            </div>
                        </div>
                    </div>
                );
            // ... strict cases ...
            case 'cte':
                return <DocumentGenerator branchCode={user.linked_branch_code || 'CO'} branchName={user.office_level} user={user} />;
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
            case 'branch_opening_survey': // Added case for BranchOpeningSurvey
                return <PlanningDashboard user={user} />;
            case 'joining_offer_letter':
                return <JoiningOfferGenerator />;
            case 'campaign_manager':
                return <CampaignManager user={user} />;
            case 'communication':
                return <RoCommunication />;
            case 'department_manager':
                return <DepartmentManager />;
            case 'interest_rates':
                return <InterestRateManager user={user} />;
            case 'interest_worksheet':
                return <InterestWorksheet user={user} />;
            case 'dindigul_region':
                return <DindigulLanding />;
            default:
                return <div>Module Under Construction</div>;
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Top Navigation */}
            <header style={{
                height: 'var(--header-height, 60px)',
                background: 'var(--surface-color)',
                borderBottom: '1px solid var(--border-color)',
                color: 'var(--text-on-light)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 2rem',
                justifyContent: 'space-between',
                flexShrink: 0 // Prevent header shrinking
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src="/src/assets/iob_logo.svg" alt="IOB" style={{ height: '45px', objectFit: 'contain' }} />
                    <div style={{ fontSize: '0.9rem', opacity: 0.8, borderLeft: '1px solid #e2e8f0', paddingLeft: '1rem', color: 'var(--text-on-light)' }}>
                        {user.office_level === 'CO' ? 'Central Office' : user.office_level === 'RO' ? 'Regional Office' : user.office_level} Workspace
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#f1f5f9', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem', color: 'var(--text-on-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={14} />
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </div>
                    <span style={{ color: 'var(--text-on-light)' }}>{user.full_name}</span>
                    <button onClick={onLogout} style={{ background: '#ef4444', border: 'none', color: 'white', padding: '0.4rem 1rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </header>

            <main style={{
                flex: 1,
                padding: '2rem',
                display: 'grid',
                gridTemplateColumns: isSidebarCollapsed ? '80px 1fr' : '250px 1fr',
                gridTemplateRows: 'minmax(0, 1fr)', // CRITICAL: Constrain grid height to viewport, preventing expansion
                gap: '2rem',
                transition: 'grid-template-columns 0.3s ease',
                overflow: 'hidden', // Enforce constraint on main container
                minHeight: 0 // Allow shrinking below content size
            }}>
                {/* Sidebar */}
                <aside className="card" style={{
                    height: '100%', // Full height sidebar
                    transition: 'width 0.3s ease',
                    width: isSidebarCollapsed ? '80px' : '100%',
                    padding: isSidebarCollapsed ? '1rem 0.5rem' : '1.5rem',
                    overflowY: 'auto', // Sidebar scrolls internally if needed
                    overflowX: 'hidden'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                        {!isSidebarCollapsed && <h4 style={{ margin: 0 }}>Menu</h4>}
                        <button
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)',
                                marginLeft: isSidebarCollapsed ? 'auto' : '0',
                                marginRight: isSidebarCollapsed ? 'auto' : '0',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                            title={isSidebarCollapsed ? "Expand" : "Collapse"}
                        >
                            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        </button>
                    </div>

                    <ul style={{ listStyle: 'none' }}>
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, roles: [] },
                            { id: 'service_requests', label: 'Service Requests', icon: <Wrench size={20} />, roles: [] },
                            { id: 'cte', label: 'Document Generator (CTE)', icon: <FileText size={20} />, roles: [] },
                            { id: 'pms', label: 'Performance (PMS)', icon: <LineChart size={20} />, roles: [] },
                            { id: 'inventory', label: 'Inventory', icon: <Package size={20} />, roles: [] },
                            { id: 'branch_opening_survey', label: 'Branch Opening Survey', icon: <MapIcon size={20} />, roles: ['SuperAdmin', 'CO_Planning', 'RO', 'Branch'] }, // Renamed 'planning' to 'branch_opening_survey' and updated label
                            { id: 'interest_rates', label: 'Interest Rates', icon: <Percent size={20} />, roles: ['SuperAdmin', 'CO_Planning', 'RO', 'Branch'] },
                            { id: 'region_manager', label: 'Region Management', icon: <Globe size={20} />, roles: ['SuperAdmin', 'CO_Planning'] },
                            { id: 'branch_manager', label: 'Branch Network', icon: <Building2 size={20} />, roles: ['SuperAdmin', 'CO_Planning', 'RO', 'Branch'] },
                            { id: 'staff_manager', label: 'Staff Management', icon: <Users size={20} />, roles: ['SuperAdmin', 'RO', 'CO'] }, // Updated roles
                            { id: 'campaign_manager', label: 'Campaigns', icon: <Megaphone size={20} />, roles: ['SuperAdmin', 'RO'] },
                            { id: 'communication', label: 'Communication', icon: <FileText size={20} />, roles: ['RO', 'SuperAdmin'] }, // Added Communication module
                            { id: 'repair_vault', label: 'Restoration & Vault', icon: <ShieldCheck size={20} />, roles: ['SuperAdmin', 'CO_Gad'] },
                            { id: 'designation_manager', label: 'Designations', icon: <BadgeCheck size={20} />, roles: ['SuperAdmin', 'CO_HRD'] },
                            { id: 'joining_offer_letter', label: 'Joining Offer Letter', icon: <FileText size={20} />, roles: ['SuperAdmin', 'CO_HRD'] },
                            // { id: 'retirement_generator', label: 'Retirement Relieving', icon: <FileText size={20} />, roles: ['SuperAdmin', 'RO', 'CO', 'CO_HRD'] }, // Moved to Document Generator
                            { id: 'department_manager', label: 'Departments', icon: <Layers size={20} />, roles: ['SuperAdmin'] },
                            { id: 'dindigul_region', label: 'Dindigul Region', icon: <MapIcon size={20} />, roles: ['SuperAdmin', 'RO', 'Branch'] }
                        ].map(item => {
                            if (item.roles.length > 0 && !item.roles.includes(user.role)) return null;

                            const isActive = activeView === item.id;
                            return (
                                <li
                                    key={item.id}
                                    onClick={() => setActiveView(item.id)}
                                    title={isSidebarCollapsed ? item.label : ''}
                                    style={{
                                        padding: '0.75rem 0.5rem',
                                        cursor: 'pointer',
                                        color: isActive ? 'var(--secondary-color)' : 'inherit',
                                        fontWeight: isActive ? 'bold' : 'normal',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                                        gap: '0.75rem',
                                        borderRadius: '0.5rem',
                                        background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                        marginBottom: '0.25rem'
                                    }}
                                >
                                    <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                                    {!isSidebarCollapsed && <span>{item.label}</span>}
                                </li>
                            );
                        })}
                    </ul>
                </aside>



                {/* content area */}
                <div style={{
                    animation: 'fadeIn 0.3s ease',
                    maxWidth: '100%',
                    height: '100%',
                    minHeight: 0,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading Module...</div>}>
                        {renderContent()}
                    </Suspense>
                </div>
            </main >
            <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div >
    );
};

import { DataProvider } from '../context/DataContext';

const DashboardWithProvider = (props) => (
    <DataProvider>
        <Dashboard {...props} />
    </DataProvider>
);

export default DashboardWithProvider;
