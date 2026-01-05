import React from 'react';
import { useData } from '../context/DataContext';

const LetterheadSelector = ({ value, onChange, label = "Select Letterhead" }) => {
    const { letterheads } = useData();

    return (
        <div className="form-group">
            <label className="label">{label}</label>
            <select
                className="input"
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
            <style>{`
        .label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: hsl(var(--neutral));
        }
      `}</style>
        </div>
    );
};

export default LetterheadSelector;
