import { useState, useEffect } from 'react';

const BranchSurveyList = ({ onCreateNew, onSelect }) => {
    const [branchSurveys, setBranchSurveys] = useState([]);
    const [loading, setLoading] = useState(true);

    // State management for surveys

    useEffect(() => {
        fetchSurveys();
    }, []);

    const fetchSurveys = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/branch-surveys');
            const data = await res.json();
            setBranchSurveys(data);
        } catch (err) {
            console.error("Error fetching surveys:", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteBranchSurvey = async (id) => {
        try {
            console.log("Deleting survey:", id);
            const res = await fetch(`http://localhost:5000/api/branch-surveys/${id}`, { method: 'DELETE' });
            if (res.ok) {
                console.log("Delete successful, refreshing list...");
                // Refresh list to show renumbered sequences
                await fetchSurveys();
            } else {
                console.error("Delete failed:", await res.text());
                alert("Failed to delete survey");
            }
        } catch (err) {
            console.error("Error deleting survey:", err);
            alert("Network error deleting survey");
        }
    };

    return (
        <div className="page-container">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 className="page-title">Branch Opening Survey Reports</h1>
                    <p className="text-neutral-500">Manage survey reports for new branches or location changes.</p>
                </div>
                <button className="btn btn-primary" onClick={onCreateNew}>
                    + Create New Report
                </button>
            </div>

            {/* Batch Operations Removed */}

            <div className="card">
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
                ) : (!branchSurveys || branchSurveys.length === 0) ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                        No survey reports found. Create your first report.
                    </div>
                ) : (
                    <div className="table-container">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>
                                    <th style={{ padding: '0.75rem', fontWeight: '600', color: '#374151' }}>Ref No</th>
                                    <th style={{ padding: '0.75rem', fontWeight: '600', color: '#374151' }}>Date</th>
                                    <th style={{ padding: '0.75rem', fontWeight: '600', color: '#374151' }}>Type</th>
                                    <th style={{ padding: '0.75rem', fontWeight: '600', color: '#374151' }}>Proposed Office</th>
                                    <th style={{ padding: '0.75rem', fontWeight: '600', color: '#374151' }}>Office Type</th>
                                    <th style={{ padding: '0.75rem', fontWeight: '600', color: '#374151' }}>Status</th>
                                    <th style={{ padding: '0.75rem', fontWeight: '600', color: '#374151', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {branchSurveys.map((survey) => (
                                    <tr
                                        key={survey.id}
                                        style={{
                                            borderBottom: '1px solid #f3f4f6',
                                            cursor: 'pointer',
                                            borderLeft: survey.applicationType === 'new' ? '4px solid #3b82f6' : '4px solid #f59e0b',
                                            backgroundColor: survey.applicationType === 'new' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(245, 158, 11, 0.05)'
                                        }}
                                        onClick={() => onSelect && onSelect(survey)}
                                    >
                                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{survey.refNo || '-'}</td>
                                        <td style={{ padding: '0.75rem' }}>
                                            {survey.date ? new Date(survey.date).toLocaleDateString('en-GB') : 'N/A'}
                                        </td>
                                        <td style={{ padding: '0.75rem' }}>
                                            {survey.applicationType === 'new' ? 'New Branch' : 'Shifting'}
                                        </td>
                                        <td style={{ padding: '0.75rem' }}>
                                            {(() => {
                                                const mainText = survey.proposedName || survey.proposedLocation || survey.applicationLocation || survey.applicationTo || 'Unnamed';

                                                // Construct location part
                                                const locParts = [];
                                                if (survey.proposedLocation && survey.proposedLocation !== mainText) locParts.push(survey.proposedLocation);
                                                if (survey.applicationType === 'change' && survey.applicationTo && survey.applicationTo !== mainText) locParts.push(`To: ${survey.applicationTo}`);

                                                // Construct admin hierarchy part
                                                const adminParts = [survey.proposedTehsil, survey.proposedDistrict, survey.proposedState].filter(Boolean);

                                                return (
                                                    <>
                                                        <div style={{ fontWeight: '500' }}>{mainText}</div>
                                                        {locParts.length > 0 && (
                                                            <div style={{ fontSize: '0.85em', color: '#6b7280' }}>{locParts.join(', ')}</div>
                                                        )}
                                                        {adminParts.length > 0 && (
                                                            <div style={{ fontSize: '0.75em', color: '#9ca3af' }}>{adminParts.join(', ')}</div>
                                                        )}
                                                    </>
                                                );
                                            })()}
                                        </td>
                                        <td style={{ padding: '0.75rem' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                fontWeight: '500',
                                                backgroundColor: '#e0f2fe',
                                                color: '#0369a1'
                                            }}>
                                                {survey.proposedStatus}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.75rem' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                fontWeight: '500',
                                                backgroundColor: survey.status === 'final' ? '#dcfce7' : '#f3f4f6',
                                                color: survey.status === 'final' ? '#166534' : '#374151'
                                            }}>
                                                {survey.status === 'final' ? 'Submitted' : 'Draft'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                                            <button
                                                className="btn btn-outline"
                                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', color: 'var(--error)', borderColor: 'var(--error)' }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (window.confirm('Are you sure you want to delete this report?')) {
                                                        deleteBranchSurvey(survey.id);
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
            <style>{`
                .table-container {
                    overflow-x: auto;
                }
                tr:hover {
                    background-color: #f9fafb;
                }
            `}</style>
        </div >
    );
};

export default BranchSurveyList;
