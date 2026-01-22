import React from 'react';
import Card from '../../../framework/ui/Card';
import Button from '../../../framework/ui/Button';
import { Edit, Trash2 } from 'lucide-react';

const DocumentList = ({ documents, onEdit, onDelete }) => {
    return (
        <Card noPadding>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b-2 border-slate-200">
                            <th className="p-4 font-semibold text-slate-700">Ref No</th>
                            <th className="p-4 font-semibold text-slate-700">Date</th>
                            <th className="p-4 font-semibold text-slate-700">Subject</th>
                            <th className="p-4 font-semibold text-slate-700">Type</th>
                            <th className="p-4 font-semibold text-slate-700">Status</th>
                            <th className="p-4 text-right font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-slate-400">
                                    No saved documents found.
                                </td>
                            </tr>
                        ) : (
                            documents.map(doc => (
                                <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                    <td className="p-4 font-bold text-primary-color">{doc.refNo}</td>
                                    <td className="p-4 text-slate-500">{new Date(doc.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 text-slate-700">{doc.subject || 'Untitled'}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600 border border-blue-100 uppercase">
                                            {doc.category === 'office_note' ? 'Note' : 'Letter'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${doc.status === 'Final'
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            : 'bg-slate-50 text-slate-500 border-slate-200'
                                            }`}>
                                            {doc.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => onEdit(doc)} icon={Edit} title="Edit" />
                                            <Button variant="ghost" size="sm" className="text-error-color hover:bg-red-50" onClick={() => onDelete(doc.id)} icon={Trash2} title="Delete" />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default DocumentList;
