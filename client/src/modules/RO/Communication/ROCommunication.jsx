import React, { useState } from 'react';
import {
    CircularManager,
    LetterManager,
    OfficeNoteForm,
    DataProvider
} from './Official';

const ROCommunication = () => {
    const [activeTab, setActiveTab] = useState('circulars');

    const renderContent = () => {
        switch (activeTab) {
            case 'circulars': return <CircularManager />;
            case 'letters': return <LetterManager />;
            case 'notes': return <OfficeNoteForm />;
            default: return <CircularManager />;
        }
    };

    return (
        <DataProvider>
            <div className="page-container">
                <div className="page-header">
                    <div>
                        <h1>Communication Hub</h1>
                        <p className="text-secondary">Manage Official Circulars, Letters, and Office Notes</p>
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="d-flex border-bottom">
                        <TabButton
                            active={activeTab === 'circulars'}
                            onClick={() => setActiveTab('circulars')}
                            icon="📢"
                            label="Circulars"
                        />
                        <TabButton
                            active={activeTab === 'letters'}
                            onClick={() => setActiveTab('letters')}
                            icon="✉️"
                            label="Official Letters"
                        />
                        <TabButton
                            active={activeTab === 'notes'}
                            onClick={() => setActiveTab('notes')}
                            icon="📝"
                            label="Office Notes"
                        />
                    </div>
                </div>

                <div className="communication-content">
                    {renderContent()}
                </div>
            </div>
        </DataProvider>
    );
};

const TabButton = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`btn rounded-none py-3 px-4 flex items-center gap-2 transition-all duration-200 border-b-2 bg-transparent ${active ? 'border-primary text-primary bg-slate-50 font-bold' : 'border-transparent text-slate-500 font-normal'}`}
    >
        <span>{icon}</span>
        <span>{label}</span>
    </button>
);

export default ROCommunication;

