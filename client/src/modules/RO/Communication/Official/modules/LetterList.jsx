import React from 'react';
import { useData } from '../context/DataContext';

const LetterList = ({ onCreateNew, onSelect }) => {
    const { letters, deleteLetter } = useData();

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Letters</h1>
                    <p className="text-slate-500">Manage your correspondence records.</p>
                </div>
                <button className="btn btn-primary" onClick={onCreateNew}>
                    + Create New Letter
                </button>
            </div>

            <div className="card">
                {letters.length === 0 ? (
                    <div className="text-center p-8 text-slate-500">
                        No letters found. Create your first letter.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-border-color text-left">
                                    <th className="p-3 font-semibold text-text-primary">Date</th>
                                    <th className="p-3 font-semibold text-text-primary">Ref No</th>
                                    <th className="p-3 font-semibold text-text-primary">Recipient</th>
                                    <th className="p-3 font-semibold text-text-primary">Subject</th>
                                    <th className="p-3 font-semibold text-text-primary text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {letters.map((letter) => (
                                    <tr
                                        key={letter.id}
                                        className="border-b border-gray-100 hover:bg-slate-50 cursor-pointer transition-colors"
                                        onClick={() => onSelect && onSelect(letter)}
                                    >
                                        <td className="p-3">
                                            {new Date(letter.date).toLocaleDateString()}
                                        </td>
                                        <td className="p-3 font-mono">{letter.refNo}</td>
                                        <td className="p-3">
                                            <div className="font-medium">{letter.recipientName}</div>
                                            <div className="text-sm text-slate-500">{letter.recipientDesignation}</div>
                                        </td>
                                        <td className="p-3 max-w-[300px]">
                                            <div className="truncate">
                                                {letter.scannedPdf && <span className="mr-2 text-lg" title="Has PDF Attachment">📎</span>}
                                                {letter.subject}
                                            </div>
                                        </td>
                                        <td className="p-3 text-right">
                                            <button
                                                className="btn btn-outline text-error-color border-error-color py-1 px-2 text-sm hover:bg-red-50"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (confirm('Are you sure you want to delete this letter?')) {
                                                        deleteLetter(letter.id);
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {/* Removed inline style block */}
        </div>
    );
};

export default LetterList;
