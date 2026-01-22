import React, { useState, useEffect } from 'react';
import { Save, Building2, Map as MapIcon, Globe, Users, CreditCard } from 'lucide-react';
import Button from '../../framework/ui/Button';

import Card from '../../framework/ui/Card';
import { UI_TEXT } from '../../constants/uiText';

const SystemConfiguration = () => {
    const [activeTab, setActiveTab] = useState('bank');
    const [loading, setLoading] = useState(false);
    const [bankConfig, setBankConfig] = useState({
        name_english: '',
        name_hindi: '',
        name_local: '',
        dept_english: '',
        dept_hindi: '',
        dept_local: ''
    });

    useEffect(() => {
        fetchBankConfig();
    }, []);

    const fetchBankConfig = async () => {
        try {
            const res = await fetch('/api/config/bank-name');
            const data = await res.json();
            if (data) setBankConfig(data);
        } catch (error) {
            console.error("Failed to load bank config", error);
        }
    };

    const handleSaveBankConfig = async () => {
        setLoading(true);
        try {
            await fetch('/api/config/bank-name', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bankConfig)
            });
            alert(UI_TEXT.CONFIG.SAVE_SUCCESS);
        } catch (error) {
            console.error("Failed to save", error);
            alert(UI_TEXT.CONFIG.SAVE_ERROR);
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'bank', label: UI_TEXT.CONFIG.TABS.BANK, icon: <Building2 size={18} /> },
        { id: 'region', label: UI_TEXT.CONFIG.TABS.REGION, icon: <Globe size={18} /> },
        { id: 'branch', label: UI_TEXT.CONFIG.TABS.BRANCH, icon: <MapIcon size={18} /> },
        { id: 'staff', label: UI_TEXT.CONFIG.TABS.STAFF, icon: <Users size={18} /> },
        { id: 'atm', label: UI_TEXT.CONFIG.TABS.ATM, icon: <CreditCard size={18} /> },
    ];

    return (
        <div className="p-6 space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">{UI_TEXT.CONFIG.TITLE}</h2>
            </div>

            <div className="flex gap-4 border-b border-slate-200 mb-6 overflow-x-auto pb-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors font-medium whitespace-nowrap ${activeTab === tab.id
                            ? 'bg-white text-primary-color border-b-2 border-primary-color shadow-sm'
                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'bank' && (
                <Card>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Building2 className="text-primary-color" /> {UI_TEXT.CONFIG.BANK_DETAILS}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="space-y-4">
                            <h4 className="font-semibold text-slate-600 border-b pb-1">{UI_TEXT.CONFIG.LABELS.ENGLISH}</h4>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{UI_TEXT.CONFIG.LABELS.BANK_NAME}</label>
                                <input
                                    className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-color outline-none"
                                    value={bankConfig.name_english || ''}
                                    onChange={e => setBankConfig({ ...bankConfig, name_english: e.target.value })}
                                    placeholder={UI_TEXT.CONFIG.PLACEHOLDERS.BANK_ENG}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{UI_TEXT.CONFIG.LABELS.DEPT_NAME}</label>
                                <input
                                    className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-color outline-none"
                                    value={bankConfig.dept_english || ''}
                                    onChange={e => setBankConfig({ ...bankConfig, dept_english: e.target.value })}
                                    placeholder={UI_TEXT.CONFIG.PLACEHOLDERS.DEPT_ENG}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-semibold text-orange-600 border-b pb-1">{UI_TEXT.CONFIG.LABELS.HINDI}</h4>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{UI_TEXT.CONFIG.LABELS.BANK_NAME_HINDI}</label>
                                <input
                                    className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
                                    value={bankConfig.name_hindi || ''}
                                    onChange={e => setBankConfig({ ...bankConfig, name_hindi: e.target.value })}
                                    placeholder={UI_TEXT.CONFIG.PLACEHOLDERS.BANK_HIN}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{UI_TEXT.CONFIG.LABELS.DEPT_NAME_HINDI}</label>
                                <input
                                    className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
                                    value={bankConfig.dept_hindi || ''}
                                    onChange={e => setBankConfig({ ...bankConfig, dept_hindi: e.target.value })}
                                    placeholder={UI_TEXT.CONFIG.PLACEHOLDERS.DEPT_HIN}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-semibold text-green-600 border-b pb-1">{UI_TEXT.CONFIG.LABELS.LOCAL}</h4>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{UI_TEXT.CONFIG.LABELS.BANK_NAME_LOCAL}</label>
                                <input
                                    className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                                    value={bankConfig.name_local || ''}
                                    onChange={e => setBankConfig({ ...bankConfig, name_local: e.target.value })}
                                    placeholder={UI_TEXT.CONFIG.PLACEHOLDERS.BANK_LOC}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{UI_TEXT.CONFIG.LABELS.DEPT_NAME_LOCAL}</label>
                                <input
                                    className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                                    value={bankConfig.dept_local || ''}
                                    onChange={e => setBankConfig({ ...bankConfig, dept_local: e.target.value })}
                                    placeholder={UI_TEXT.CONFIG.PLACEHOLDERS.DEPT_LOC}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        <Button variant="primary" onClick={handleSaveBankConfig} isLoading={loading} icon={<Save size={18} />}>
                            {UI_TEXT.CONFIG.SAVE_BUTTON}
                        </Button>
                    </div>
                </Card>
            )}

            {activeTab !== 'bank' && (
                <div className="p-12 text-center text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                    <Globe size={48} className="mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold">{UI_TEXT.CONFIG.COMING_SOON}</h3>
                    <p>{UI_TEXT.CONFIG.UNDER_DEVELOPMENT}</p>
                </div>
            )}
        </div>
    );
};

export default SystemConfiguration;
