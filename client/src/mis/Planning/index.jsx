import React, { useState } from 'react';
import { Settings, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import BranchSurveyList from './BranchSurveyList';
import BranchOpeningSurvey from '../../generators/SurveyReport';
import BankNameConfig from './BankNameConfig';

const PlanningDashboard = ({ user }) => {
    // Mode: 'list' | 'create' | 'edit' | 'settings'
    const [mode, setMode] = useState('list');
    const [selectedSurvey, setSelectedSurvey] = useState(null);

    return (
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflow: 'auto' }}>
                {mode === 'list' && (
                    <div className="relative">
                        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div>
                                <h1 className="page-title">Branch Opening Survey Reports</h1>
                                <p className="text-neutral-500">Manage survey reports for new branches or location changes.</p>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => setMode('settings')}
                                    className="flex items-center gap-2 bg-white hover:bg-gray-50 text-blue-900 px-4 py-2 rounded-lg transition-all shadow-md border border-blue-100"
                                    title="Bank Name Configuration"
                                >
                                    <Settings size={18} />
                                    <span className="text-sm font-semibold">Settings</span>
                                </button>
                                <button className="btn btn-primary" onClick={() => {
                                    setSelectedSurvey(null);
                                    setMode('create');
                                }}>
                                    + Create New Report
                                </button>
                            </div>
                        </div>
                        <BranchSurveyList
                            onCreateNew={() => {
                                setSelectedSurvey(null);
                                setMode('create');
                            }}
                            onSelect={(survey) => {
                                setSelectedSurvey(survey);
                                setMode('edit');
                            }}
                        />
                    </div>
                )}

                {(mode === 'create' || mode === 'edit') && (
                    <BranchOpeningSurvey
                        user={user}
                        onBack={() => {
                            setMode('list');
                            setSelectedSurvey(null);
                        }}
                        initialData={selectedSurvey}
                    />
                )}

                {mode === 'settings' && (
                    <BankNameConfig
                        onBack={() => setMode('list')}
                    />
                )}
            </div>
        </div>
    );
};

export default PlanningDashboard;
