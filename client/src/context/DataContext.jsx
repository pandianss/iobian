import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [branchSurveys, setBranchSurveys] = useState([]);
    const [letterheads, setLetterheads] = useState([]); // Placeholder if needed

    const fetchBranchSurveys = useCallback(async () => {
        try {
            const res = await fetch('http://localhost:5000/api/branch-surveys');
            const data = await res.json();
            setBranchSurveys(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch branch surveys", error);
        }
    }, []);

    useEffect(() => {
        fetchBranchSurveys();
    }, [fetchBranchSurveys]);

    const addBranchSurvey = async (survey) => {
        try {
            const res = await fetch('http://localhost:5000/api/branch-surveys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(survey)
            });
            const result = await res.json();
            if (result.success) {
                setBranchSurveys(prev => [...prev, result.survey]);
                return result.survey;
            }
        } catch (error) {
            console.error("Failed to add survey", error);
        }
        return null;
    };

    const updateBranchSurvey = async (id, updates) => {
        try {
            const res = await fetch(`http://localhost:5000/api/branch-surveys/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            const result = await res.json();
            if (result.success) {
                setBranchSurveys(prev => prev.map(s => s.id === id ? result.survey : s));
                return result.survey;
            }
        } catch (error) {
            console.error("Failed to update survey", error);
        }
        return null;
    };

    const deleteBranchSurvey = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/branch-surveys/${id}`, {
                method: 'DELETE'
            });
            const result = await res.json();
            if (result.success) {
                setBranchSurveys(prev => prev.filter(s => s.id !== id));
                return true;
            }
        } catch (error) {
            console.error("Failed to delete survey", error);
        }
        return false;
    };

    const value = {
        branchSurveys,
        addBranchSurvey,
        updateBranchSurvey,
        deleteBranchSurvey,
        letterheads,
        refreshData: fetchBranchSurveys
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
