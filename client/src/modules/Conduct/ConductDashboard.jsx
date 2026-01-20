import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Scale } from 'lucide-react';
import RegulationViewer from './RegulationViewer';
import ComplianceChecker from './ComplianceChecker';

const ConductDashboard = () => {
    const [activeTab, setActiveTab] = useState('checker'); // Default to checker system

    return (
        <div className="p-6 max-w-7xl mx-auto h-[cal(100vh-4rem)] overflow-y-auto">
            <div className="mb-8 border-b pb-4 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Conduct & Discipline</h1>
                    <p className="text-gray-500 mt-1">IOB Officer Employees' (Conduct) Regulations, 1976</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('document')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'document'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        <BookOpen size={20} />
                        Read Regulations
                    </button>
                    <button
                        onClick={() => setActiveTab('checker')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'checker'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        <ShieldCheck size={20} />
                        Compliance Checker
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px]">
                {activeTab === 'document' ? (
                    <RegulationViewer />
                ) : (
                    <ComplianceChecker />
                )}
            </div>
        </div>
    );
};

export default ConductDashboard;
