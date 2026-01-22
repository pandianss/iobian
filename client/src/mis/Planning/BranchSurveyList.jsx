import React from 'react';
import { useData } from '../../../context/DataContext';

const BranchSurveyList = ({ onCreateNew, onSelect }) => {
    const { branchSurveys, deleteBranchSurvey } = useData();

    return (
        <div className="page-container">
            <div className="page-header flex justify-between items-center">
                <div>
                    <h1 className="page-title">Branch Opening Survey Reports</h1>
                    <p className="text-neutral-500">Manage survey reports for new branches or location changes.</p>
                </div>
                <button className="btn btn-primary" onClick={onCreateNew}>
                    + Create New Report
                </button>
            </div>

            <div className="card">
                {(!branchSurveys || branchSurveys.length === 0) ? (
                    <div className="text-center p-8 text-gray-500">
                        No survey reports found. Create your first report.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 text-left">
                                    <th className="p-3 font-semibold text-gray-700">Date</th>
                                    <th className="p-3 font-semibold text-gray-700">Region</th>
                                    <th className="p-3 font-semibold text-gray-700">Proposed Office</th>
                                    <th className="p-3 font-semibold text-gray-700">Office Type</th>
                                    <th className="p-3 font-semibold text-gray-700">Status</th>
                                    <th className="p-3 font-semibold text-gray-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {branchSurveys.map((survey) => (
                                    <tr
                                        key={survey.id}
                                        className="border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                                        onClick={() => onSelect && onSelect(survey)}
                                    >
                                        <td className="p-3">
                                            {survey.date ? new Date(survey.date).toLocaleDateString('en-GB') : 'N/A'}
                                        </td>
                                        <td className="p-3">{survey.region || '-'}</td>
                                        <td className="p-3">
                                            <div className="font-medium">{survey.proposedName || 'Unnamed'}</div>
                                            <div className="text-xs text-gray-500">{survey.proposedLocation}</div>
                                        </td>
                                        <td className="p-3">
                                            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-700">
                                                {survey.proposedStatus}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${survey.status === 'final' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {survey.status === 'final' ? 'Submitted' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-3 text-right">
                                            <button
                                                className="btn btn-outline text-sm px-2 py-1"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (confirm('Are you sure you want to delete this report?')) {
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
        </div>
    );
};

export default BranchSurveyList;
