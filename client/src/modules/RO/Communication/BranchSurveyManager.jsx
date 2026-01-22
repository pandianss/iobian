import React, { useState } from 'react';
import BranchSurveyList from './BranchSurveyList';
import BranchOpeningSurveyReport from './BranchOpeningSurveyReport';

const BranchSurveyManager = () => {
    // Mode: 'list' | 'create' | 'edit'
    const [mode, setMode] = useState('list');
    const [selectedSurvey, setSelectedSurvey] = useState(null);

    return (
        <div className="relative">
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
                <BranchOpeningSurveyReport
                    onBack={() => {
                        setMode('list');
                        setSelectedSurvey(null);
                    }}
                    initialData={selectedSurvey}
                />
            )}
        </div>
    );
};

export default BranchSurveyManager;
