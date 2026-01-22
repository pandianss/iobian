import React from 'react';
import { useData } from '../../context/DataContext';

const LetterheadSelector = ({ value, onChange, label = "Select Letterhead" }) => {
    const { letterheads } = useData();

    return (
    return (
        <div className="mb-4">
            <label className="block mb-2 font-medium text-slate-700">{label}</label>
            <select
                className="input w-full"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">-- Choose Letterhead --</option>
                {letterheads.map(lh => (
                    <option key={lh.id} value={lh.id}>
                        {lh.name}
                    </option>
                ))}
            </select>
        </div>
    );
    );
};

export default LetterheadSelector;
