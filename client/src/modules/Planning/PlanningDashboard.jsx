import React, { useState } from 'react';
import { Settings, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import BranchSurveyList from './BranchSurveyList';
import BranchOpeningSurvey from './BranchOpeningSurvey';

const PlanningDashboard = ({ user }) => {
    // Mode: 'list' | 'create' | 'edit'
    const [mode, setMode] = useState('list');
    const [selectedSurvey, setSelectedSurvey] = useState(null);

    return (
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflow: 'auto' }}>
                {mode === 'list' && (
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
            </div>
        </div>
    );
};

export default PlanningDashboard;
