import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';

const BankNameConfig = ({ onBack }) => {
    const [config, setConfig] = useState({
        name_english: '',
        name_hindi: '',
        name_local: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchBankName();
    }, []);

    const fetchBankName = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/config/bank-name');
            const data = await response.json();
            setConfig(data);
        } catch (error) {
            console.error('Error fetching bank name:', error);
            setMessage({ type: 'error', text: 'Failed to load configuration' });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);
        try {
            const response = await fetch('http://localhost:5000/api/config/bank-name', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            const result = await response.json();
            if (result.success) {
                setMessage({ type: 'success', text: 'Bank name configuration saved successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to save configuration' });
            }
        } catch (error) {
            console.error('Error saving bank name:', error);
            setMessage({ type: 'error', text: 'An error occurred while saving' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-10">
                <RefreshCw className="animate-spin mr-2 text-blue-600" />
                <span>Loading configuration...</span>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8 border-b pb-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Bank Name Configuration</h1>
                        <p className="text-sm text-gray-500 italic">Configure trilingual bank name for reports and official documents</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                    <span className="font-semibold">{saving ? 'Saving...' : 'Save Configuration'}</span>
                </button>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                    <AlertCircle size={20} />
                    <span>{message.text}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Bank Identity</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bank Name (English)</label>
                            <input
                                type="text"
                                value={config.name_english}
                                onChange={(e) => setConfig({ ...config, name_english: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bank Name (Hindi)</label>
                            <input
                                type="text"
                                value={config.name_hindi}
                                onChange={(e) => setConfig({ ...config, name_hindi: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bank Name (Local)</label>
                            <input
                                type="text"
                                value={config.name_local}
                                onChange={(e) => setConfig({ ...config, name_local: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-lg"
                            />
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2 pt-4">Department Identity</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Dept Name (English)</label>
                            <input
                                type="text"
                                value={config.dept_english}
                                onChange={(e) => setConfig({ ...config, dept_english: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Dept Name (Hindi)</label>
                            <input
                                type="text"
                                value={config.dept_hindi}
                                onChange={(e) => setConfig({ ...config, dept_hindi: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Dept Name (Local)</label>
                            <input
                                type="text"
                                value={config.dept_local}
                                onChange={(e) => setConfig({ ...config, dept_local: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-200">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Report Header Preview</h3>
                    <div className="bg-white p-8 shadow-lg rounded-sm border-t-8 border-blue-900 flex flex-col items-center">
                        {/* Logo Row Preview */}
                        <div className="w-full grid grid-cols-[20%_60%_20%] items-center mb-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-900 font-bold text-xs">LOGO</span>
                            </div>
                            <div className="text-center">
                                <div className="text-[10px] text-gray-400 font-bold mb-1">{config.name_hindi || 'HINDI NAME'}</div>
                                <div className="text-sm font-black text-blue-900 uppercase tracking-wide">{config.name_english || 'ENGLISH NAME'}</div>
                                <div className="text-[10px] text-gray-400 font-bold mt-1">{config.name_local || 'LOCAL NAME'}</div>
                            </div>
                            <div className="text-right text-[10px] font-bold text-blue-900">
                                Regional Office – Dindigul
                            </div>
                        </div>

                        {/* Dept Row Preview */}
                        <div className="w-full border-t border-gray-100 pt-4 text-center">
                            <div className="text-[11px] font-bold text-gray-800">
                                {config.dept_hindi || 'योजना विभाग'} / {config.dept_english || 'Planning Department'} / {config.dept_local || 'திட்டமிடல் துறை'}
                            </div>
                        </div>

                        {/* Address Row Preview */}
                        <div className="w-full mt-2 text-center text-[9px] text-gray-500 leading-tight">
                            <div>#17-i, Pensioners Street, Palani Road</div>
                            <div>Dindigul – 624001</div>
                        </div>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-4 text-center">Visualizes how identity fields propagate to PSU-standard headers.</p>
                </div>
            </div>
        </div>
    );
};

export default BankNameConfig;
