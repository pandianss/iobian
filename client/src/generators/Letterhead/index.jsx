import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const LetterheadManager = () => {
    const { letterheads, addLetterhead, updateLetterhead, deleteLetterhead } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentLh, setCurrentLh] = useState({ name: '', header: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentLh.id) {
            updateLetterhead(currentLh.id, currentLh);
        } else {
            addLetterhead(currentLh);
        }
        setIsEditing(false);
        setCurrentLh({ name: '', header: '' });
    };

    const handleEdit = (lh) => {
        setCurrentLh(lh);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this letterhead?')) {
            deleteLetterhead(id);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Letterhead Configuration</h1>
                {!isEditing && (
                    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                        + New Letterhead
                    </button>
                )}
            </div>

            <div className="content-grid">
                {/* Form Section */}
                {isEditing && (
                    <div className="card mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-slate-700">{currentLh.id ? 'Edit' : 'Create'} Letterhead</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                            <div>
                                <label className="block mb-2 font-medium text-slate-700">Template Name</label>
                                <input
                                    type="text"
                                    className="input w-full p-2 border border-border-color rounded-md"
                                    value={currentLh.name}
                                    onChange={(e) => setCurrentLh({ ...currentLh, name: e.target.value })}
                                    placeholder="e.g. Standard Office"
                                    required
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-slate-700">Header Text</label>
                                <input
                                    type="text"
                                    className="input w-full p-2 border border-border-color rounded-md"
                                    value={currentLh.header}
                                    onChange={(e) => setCurrentLh({ ...currentLh, header: e.target.value })}
                                    placeholder="e.g. Regional Planning Office, Dindigul"
                                    required
                                />
                            </div>
                            {/* Logo upload could go here */}

                            <div className="flex gap-4 mt-4">
                                <button type="submit" className="btn btn-primary">Save Template</button>
                                <button
                                    type="button"
                                    className="btn btn-outline border-border-color text-text-secondary hover:bg-slate-50"
                                    onClick={() => { setIsEditing(false); setCurrentLh({ name: '', header: '' }); }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* List Section */}
                <div className="grid grid-cols-1 gap-4">
                    {letterheads.map(lh => (
                        <div key={lh.id} className="card flex justify-between items-center mb-4 p-4 hover:shadow-md transition-shadow">
                            <div>
                                <h3 className="text-lg font-semibold mb-1 text-slate-800">{lh.name}</h3>
                                <p className="text-sm text-slate-500">{lh.header}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="btn btn-outline py-1 px-3 text-sm" onClick={() => handleEdit(lh)}>Edit</button>
                                <button
                                    className="btn btn-outline border-error-color text-error-color hover:bg-red-50 py-1 px-3 text-sm"
                                    onClick={() => handleDelete(lh.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {letterheads.length === 0 && <p className="text-center text-slate-500 py-8">No letterheads configured.</p>}
                </div>
            </div>
        </div>
    );
};

export default LetterheadManager;
