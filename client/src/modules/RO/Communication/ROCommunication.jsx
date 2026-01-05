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
        className={`btn rounded-0 py-3 px-4 d-flex align-items-center gap-2 ${active ? 'border-primary border-bottom-2 text-primary bg-light' : 'text-muted border-transparent'}`}
        style={{
            border: 'none',
            borderBottom: active ? '3px solid #0d6efd' : '3px solid transparent',
            background: active ? '#f8f9fa' : 'transparent',
            fontWeight: active ? '600' : '400',
            transition: 'all 0.2s'
        }}
    >
        <span>{icon}</span>
        <span>{label}</span>
    </button>
);

export default ROCommunication;

