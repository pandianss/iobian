import React from 'react';

const CommonNoteFields = ({ formData, setFormData, activeCategory }) => {
    return (
        <div className="mb-6">
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Department</label>
                        <input
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-md transition-all duration-200 focus:shadow-md focus:border-primary-color focus:ring-1 focus:ring-primary-color outline-none"
                            value={formData.department}
                            onChange={e => setFormData({ ...formData, department: e.target.value })}
                        />
                    </div>
                    {activeCategory === 'letter' && (
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Letter Type</label>
                            <div className="flex gap-4 mt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="letterType"
                                        checked={formData.letterType === 'internal'}
                                        onChange={() => setFormData(prev => ({ ...prev, letterType: 'internal' }))}
                                    />
                                    Internal
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="letterType"
                                        checked={formData.letterType === 'external'}
                                        onChange={() => setFormData(prev => ({ ...prev, letterType: 'external' }))}
                                    />
                                    External
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">To</label>
            <input
                className="w-full p-2.5 bg-white border border-slate-300 rounded-md transition-all duration-200 focus:shadow-md focus:border-primary-color focus:ring-1 focus:ring-primary-color outline-none mb-6"
                value={formData.recipient}
                onChange={e => setFormData({ ...formData, recipient: e.target.value })}
            />

            <div className="grid grid-cols-[1fr,3fr] gap-4 mb-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Note No.</label>
                    <input
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-md transition-all duration-200 focus:shadow-md focus:border-primary-color focus:ring-1 focus:ring-primary-color outline-none"
                        value={formData.officeNoteNo}
                        onChange={e => setFormData({ ...formData, officeNoteNo: e.target.value })}
                        placeholder="e.g. 05"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Subject</label>
                    <input
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-md transition-all duration-200 focus:shadow-md focus:border-primary-color focus:ring-1 focus:ring-primary-color outline-none"
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Request for Asset Transfer"
                    />
                </div>
            </div>
        </div>
    );
};

export default CommonNoteFields;
