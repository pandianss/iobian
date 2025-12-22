import React, { useEffect, useState } from 'react';

const Scorecard = ({ divisionId }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch mock PMS data
        fetch(`http://localhost:5000/api/pms/${divisionId || 'general'}`)
            .then(res => res.json())
            .then(setData);
    }, [divisionId]);

    if (!data) return <div>Loading Scorecard...</div>;

    return (
        <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Performance Scorecard</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ background: 'var(--primary-color)', color: 'white' }}>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Overall Score</div>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{data.score}</div>
                </div>
                {data.kpis.map((kpi, idx) => (
                    <div key={idx} className="card">
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{kpi.name}</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--secondary-color)' }}>{kpi.value}</div>
                    </div>
                ))}
            </div>

            <div className="card">
                <h4 style={{ marginBottom: '1rem' }}>Trend Analysis</h4>
                <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: '10px' }}>
                    {/* Simple CSS Bar Chart */}
                    {[40, 60, 45, 80, 70, data.score].map((val, i) => (
                        <div key={i} style={{
                            width: '100%',
                            height: `${val}%`,
                            background: i === 5 ? 'var(--accent-color)' : 'var(--border-color)',
                            borderRadius: '4px 4px 0 0',
                            transition: 'height 0.5s ease',
                            position: 'relative'
                        }}>
                            <span style={{ position: 'absolute', top: '-25px', width: '100%', textAlign: 'center', fontSize: '0.8rem' }}>{val}</span>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov (Curr)</span>
                </div>
            </div>
        </div>
    );
};

export default Scorecard;
