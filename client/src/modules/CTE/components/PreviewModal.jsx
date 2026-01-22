import React from 'react';
import Button from '../../../framework/ui/Button';
import { Printer, X } from 'lucide-react';

const PreviewModal = ({
    activeCategory,
    previewMode,
    setPreviewMode,
    onClose,
    onDownloadPDF,
    children // The actual HTML content will be passed as children or part of render logic
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start z-[1000] p-8 overflow-y-auto backdrop-blur-sm">
            {/* Print Styles are now handled in index.css */}

            <div className="card printable-document w-full max-w-[900px] border border-slate-200 shadow-xl bg-white relative p-0">
                {/* Modal Toolbar */}
                <div className="no-print p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center w-full">
                    <div className="flex gap-4 items-center">
                        <h3 className="m-0 text-lg font-semibold text-slate-800">Preview</h3>
                        {activeCategory === 'office_note' && (
                            <div className="flex bg-slate-200 p-0.5 rounded-md">
                                <button
                                    onClick={() => setPreviewMode('note')}
                                    className={`px-4 py-1.5 rounded text-sm transition-all ${previewMode === 'note' ? 'bg-white font-semibold shadow-sm' : 'bg-transparent text-slate-600'}`}
                                >
                                    Office Note
                                </button>
                                <button
                                    onClick={() => setPreviewMode('advise')}
                                    className={`px-4 py-1.5 rounded text-sm transition-all ${previewMode === 'advise' ? 'bg-white font-semibold shadow-sm' : 'bg-transparent text-slate-600'}`}
                                >
                                    Sanction Advise
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <Button variant="secondary" icon={Printer} onClick={() => window.print()}>Print</Button>
                        <Button variant="gold" icon={Printer} onClick={onDownloadPDF}>Download PDF</Button>
                        <button
                            onClick={onClose}
                            className="p-2 rounded bg-red-50 text-error-color hover:bg-red-100 border border-transparent transition-colors cursor-pointer"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div id="pdf-content" className="p-8 bg-white">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PreviewModal;
