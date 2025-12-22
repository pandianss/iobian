// ... imports ...
import React, { useState } from 'react';
import DocumentGenerator from '../modules/CTE/DocumentGenerator';
import Scorecard from '../modules/PMS/Scorecard';
import InventoryManager from '../modules/Inventory/InventoryManager'; // Import Inventory
import RegionManager from '../modules/Admin/RegionManager';
import BranchManager from '../modules/Admin/BranchManager';
import StaffManager from '../modules/HR/StaffManager';
import RestorationVault from '../modules/Admin/RestorationVault';
import DesignationManager from '../modules/Admin/DesignationManager';

const Dashboard = ({ user, onLogout, timeLeft }) => {
    const [activeView, setActiveView] = useState('dashboard');

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="card">
                            <h3>Welcome back, {user.full_name}</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                You are logged in as <strong>{user.role}</strong>.
                                {user.linked_branch_code && <span> Managing Branch: <strong>{user.linked_branch_code}</strong></span>}
                            </p>
                        </div>

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
            case 'cte':
                return <DocumentGenerator branchCode={user.linked_branch_code || 'CO'} branchName={user.office_level} />;
            case 'pms':
                return <Scorecard divisionId={user.dept_id} />;
            case 'inventory':
                return <InventoryManager />;
            case 'region_manager':
                return <RegionManager />;
            case 'branch_manager':
                return <BranchManager />;
            case 'staff_manager':
                return <StaffManager />;
            case 'repair_vault':
                return <RestorationVault />;
            case 'designation_manager':
                return <DesignationManager />;
            default:
                return <div>Module Under Construction</div>;
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Top Navigation */}
            <header style={{
                height: 'var(--header-height, 60px)',
                background: 'var(--primary-color)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                padding: '0 2rem',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>IOB Portal</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>| {user.office_level} Workspace</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                        ⏱ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </div>
                    <span>{user.full_name}</span>
                    <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.4rem 1rem', borderRadius: '4px' }}>
                        Logout
                    </button>
                </div>
            </header>

            <main style={{ flex: 1, padding: '2rem', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
                {/* Sidebar */}
                <aside className="card" style={{ height: 'fit-content' }}>
                    <h4 style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>Menu</h4>
                    <ul style={{ listStyle: 'none' }}>
                        <li
                            onClick={() => setActiveView('dashboard')}
                            style={{ padding: '0.5rem 0', cursor: 'pointer', color: activeView === 'dashboard' ? 'var(--secondary-color)' : 'inherit', fontWeight: activeView === 'dashboard' ? 'bold' : 'normal' }}>
                            Dashboard
                        </li>
                        <li
                            onClick={() => setActiveView('service_requests')}
                            style={{ padding: '0.5rem 0', cursor: 'pointer', color: activeView === 'service_requests' ? 'var(--secondary-color)' : 'inherit' }}>
                            Service Requests
                        </li>
                        <li
                            onClick={() => setActiveView('cte')}
                            style={{ padding: '0.5rem 0', cursor: 'pointer', color: activeView === 'cte' ? 'var(--secondary-color)' : 'inherit' }}>
                            Document Generator (CTE)
                        </li>
                        <li
                            onClick={() => setActiveView('pms')}
                            style={{ padding: '0.5rem 0', cursor: 'pointer', color: activeView === 'pms' ? 'var(--secondary-color)' : 'inherit' }}>
                            Performance (PMS)
                        </li>
                        <li
                            onClick={() => setActiveView('inventory')}
                            style={{ padding: '0.5rem 0', cursor: 'pointer', color: activeView === 'inventory' ? 'var(--secondary-color)' : 'inherit' }}>
                            Inventory
                        </li>

                        {(user.role === 'SuperAdmin' || user.role === 'CO_Planning') && (
                            <>
                                <li
                                    onClick={() => setActiveView('region_manager')}
                                    style={{ padding: '0.5rem 0', cursor: 'pointer', color: activeView === 'region_manager' ? 'var(--secondary-color)' : 'inherit', borderTop: '1px solid var(--border-color)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                                    Region Management
                                </li>
                                <li
                                    onClick={() => setActiveView('branch_manager')}
                                    style={{ padding: '0.5rem 0', cursor: 'pointer', color: activeView === 'branch_manager' ? 'var(--secondary-color)' : 'inherit' }}>
                                    Branch Network
                                </li>
                            </>
                        )}

                        {(user.role === 'SuperAdmin' || user.role === 'CO_HRD') && (
                            <li
                                onClick={() => setActiveView('staff_manager')}
                                style={{ padding: '0.5rem 0', cursor: 'pointer', color: activeView === 'staff_manager' ? 'var(--secondary-color)' : 'inherit' }}>
                                Staff Management
                            </li>
                        )}

                        {user.role === 'SuperAdmin' && (
                            <li
                                onClick={() => setActiveView('repair_vault')}
                                style={{ padding: '0.5rem 0', cursor: 'pointer', color: activeView === 'repair_vault' ? 'red' : 'var(--text-secondary)', fontWeight: activeView === 'repair_vault' ? 'bold' : 'normal' }}>
                                Restoration Vault
                            </li>
                            <li
                                onClick={() => setActiveView('designation_manager')}
                                style={{ padding: '0.5rem 0', cursor: 'pointer', color: activeView === 'designation_manager' ? 'var(--secondary-color)' : 'inherit' }}>
                                Designations
                            </li>
                        )}
                    </ul>
                </aside>

                {/* content area */}
                <div style={{ animation: 'fadeIn 0.3s ease' }}>
                    {renderContent()}
                </div>
            </main>
            <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
