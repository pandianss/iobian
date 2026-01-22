import React from 'react';
import Card from '../../../framework/ui/Card';
import { ChevronRight } from 'lucide-react';
import CommonNoteFields from './forms/CommonNoteFields';
import BrokenPeriodForm from './forms/BrokenPeriodForm';
import TimeBarredDraftForm from './forms/TimeBarredDraftForm';

const DocumentEditor = ({
    activeCategory,
    officeNoteType,
    setOfficeNoteType,
    officeNoteTypes,
    categories,
    formData,
    setFormData,
    onGenerate,
    // Props for sub-forms
    fileInputRef,
    rates,
    fetchRowRate,
    calculateBrokenPeriodInterest
}) => {

    // Check if category is "office_note" or "letter" to show generic fields
    const isStandardDoc = activeCategory === 'office_note' || activeCategory === 'letter';

    return (
        <div className="flex flex-col gap-6 h-full p-2">
            {/* Office Note Sub-Selector */}
            {activeCategory === 'office_note' && (
                <Card className="bg-gradient-to-r from-indigo-50 to-white border-indigo-100 p-4">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-indigo-900">Note Type:</span>
                        <select
                            value={officeNoteType}
                            onChange={(e) => setOfficeNoteType(e.target.value)}
                            className="flex-1 p-2 bg-white border border-indigo-200 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            {officeNoteTypes.map(t => (
                                <option key={t.id} value={t.id}>{t.label}</option>
                            ))}
                        </select>
                    </div>
                </Card>
            )}

            <Card>
                <div className="mb-6 pb-4 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800">
                        Compose {categories.find(c => c.id === activeCategory)?.label || 'Document'}
                    </h3>
                </div>

                {isStandardDoc ? (
                    <>
                        {/* Common Fields (To, From, Subject) */}
                        <CommonNoteFields
                            formData={formData}
                            setFormData={setFormData}
                            activeCategory={activeCategory}
                        />

                        {/* Specific Forms */}
                        {activeCategory === 'office_note' && officeNoteType === 'broken_period' && (
                            <BrokenPeriodForm
                                formData={formData}
                                setFormData={setFormData}
                                rates={rates}
                                fetchRowRate={fetchRowRate}
                                calculateBrokenPeriodInterest={calculateBrokenPeriodInterest}
                            />
                        )}

                        {activeCategory === 'office_note' && officeNoteType === 'time_barred_draft' && (
                            <TimeBarredDraftForm
                                formData={formData}
                                setFormData={setFormData}
                                fileInputRef={fileInputRef}
                            />
                        )}

                        {/* Content Textarea (Hidden for broken_period as it is auto-generated in preview) */}
                        {officeNoteType !== 'broken_period' && (
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Content</label>
                                <textarea
                                    rows="15"
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full p-3 rounded-md border border-slate-300 font-inherit focus:ring-2 focus:ring-primary-color focus:border-primary-color focus:shadow-md transition-all outline-none resize-y"
                                    placeholder="Type the body of the letter here..."
                                />
                            </div>
                        )}

                        <div className="mt-6 flex gap-4">
                            <button className="btn bg-gradient-to-r from-primary-color to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center gap-2 px-6 py-2.5 rounded-full font-bold" onClick={onGenerate}>
                                Generate Preview <ChevronRight size={18} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16 text-slate-400">
                        <p>Module <strong>{categories.find(c => c.id === activeCategory)?.label || 'Document'}</strong> is under construction.</p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default DocumentEditor;
