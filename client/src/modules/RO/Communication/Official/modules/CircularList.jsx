import React from 'react';
import { useData } from '../context/DataContext';

const CircularList = ({ onCreateNew, onSelect }) => {
    const { circulars, deleteCircular } = useData();

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Circulars</h1>
                    <p className="text-slate-500">Manage internal circulars and memos.</p>
                </div>
                <button className="btn btn-primary" onClick={onCreateNew}>
                    + Create New Circular
                </button>
            </div>

            <div className="card text-center p-8 text-slate-500">
                {circulars.length === 0 ? (
                    <div>
                        No circulars found. Create your first circular.
                    </div>
                ) : (
                    <div className="overflow-x-auto w-full">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 text-left">
                                    <th className="p-3 font-semibold text-slate-700">Date</th>
                                    <th className="p-3 font-semibold text-slate-700">Ref No</th>
                                    <th className="p-3 font-semibold text-slate-700">Subject</th>
                                    <th className="p-3 font-semibold text-slate-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {circulars.map((circular) => (
                                    <tr
                                        key={circular.id}
                                        className="border-b border-gray-100 cursor-pointer hover:bg-slate-50 transition-colors"
                                        onClick={() => onSelect && onSelect(circular)}
                                    >
                                        <td className="p-3">
                                            {circular.issuanceDate
                                                ? new Date(circular.issuanceDate).toLocaleDateString()
                                                : (circular.date ? new Date(circular.date).toLocaleDateString() : 'N/A')
                                            }
                                        </td>
                                        <td className="p-3 font-mono text-sm">{circular.refNo}</td>
                                        <td className="p-3 max-w-[300px]">
                                            <div className="truncate">
                                                {circular.scannedPdf && <span className="mr-2">📎</span>}
                                                {circular.subject}
                                            </div>
                                        </td>
                                        <td className="p-3 text-right">
                                            <button
                                                className="btn btn-outline border-error-color text-error-color hover:bg-red-50 py-1 px-3 text-sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (confirm('Are you sure you want to delete this circular?')) {
                                                        deleteCircular(circular.id);
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
        </div>
    );
};

export default CircularList;
