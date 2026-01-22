import React from 'react';
import Card from '../../../framework/ui/Card';
import { Files } from 'lucide-react';

const DocumentMenu = ({ categories, activeCategory, setActiveCategory, documents, onSelectRecent, setViewMode }) => {
    return (
        <Card noPadding className="h-fit sticky top-0 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Categories</h3>
            </div>
            <div className="flex flex-col py-2">
                {categories.map(cat => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-3 px-4 py-3 text-sm transition-all rounded-r-full mr-2 ${isActive
                                ? 'bg-primary-gradient text-text-inverse shadow-md translate-x-1 font-bold tracking-wide border-l-4 border-secondary-color'
                                : 'text-text-secondary hover:bg-slate-100 hover:text-text-primary'
                                }`}
                        >
                            <Icon size={18} />
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            {/* Recent Saved Notes List */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                <h4 className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <Files size={14} /> Recent Saved
                </h4>
                <div className="flex flex-col gap-2">
                    {documents.slice(0, 5).map(doc => (
                        <button
                            key={doc.id}
                            onClick={() => onSelectRecent(doc)}
                            className="p-3 text-left bg-white border border-slate-200 rounded-md hover:border-primary-color hover:shadow-sm transition-all group"
                        >
                            <div className="font-semibold text-slate-700 text-xs truncate group-hover:text-primary-color">{doc.subject || '(No Subject)'}</div>
                            <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                                <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                                <span>{doc.refNo}</span>
                            </div>
                        </button>
                    ))}
                    {documents.length === 0 && <div className="text-xs text-slate-400 text-center py-4">No saved notes yet.</div>}
                    {documents.length > 5 && (
                        <button
                            onClick={() => setViewMode('list')}
                            className="text-[10px] font-bold text-primary-color hover:underline text-center"
                        >
                            View all documents
                        </button>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default DocumentMenu;
