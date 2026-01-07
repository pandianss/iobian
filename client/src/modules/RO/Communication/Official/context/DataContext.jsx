import React, { createContext, useContext, useState, useEffect } from 'react';
import * as idb from '../utils/idb';
import iobLogo from '../../../../assets/iob_logo.svg';

const defaultLogo = iobLogo;

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // 1. Settings (Mock or LocalStorage)
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('settings');
        return saved ? JSON.parse(saved) : {
            regionCode: 'R01',
            defaultBranchCode: 'B01'
        };
    });

    // 2. Branches (Mock or LocalStorage)
    const [branches, setBranches] = useState(() => {
        const saved = localStorage.getItem('branches');
        return saved ? JSON.parse(saved) : [
            { id: 'b1', name: 'Main Branch', code: 'B01', location: 'Dindigul' },
            { id: 'b2', name: 'City Branch', code: 'B02', location: 'Dindigul' }
        ];
    });

    // 3. Letterheads
    const [letterheads, setLetterheads] = useState(() => {
        const saved = localStorage.getItem('letterheads');
        return saved ? JSON.parse(saved) : [
            {
                id: 'default',
                name: 'Standard Office',
                header: 'Regional Planning Office, Dindigul',
                logo: defaultLogo
            }
        ];
    });

    // 4. Data States
    const [officeNotes, setOfficeNotes] = useState([]);
    const [letters, setLetters] = useState([]);
    const [circulars, setCirculars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Initial Load from IndexedDB
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const dbLetters = await idb.getAll('letters');
                setLetters(dbLetters);

                const dbCirculars = await idb.getAll('circulars');
                setCirculars(dbCirculars);

                const dbNotes = await idb.getAll('officeNotes');
                setOfficeNotes(dbNotes);
            } catch (error) {
                console.error("Failed to load data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    // --- Actions ---

    // Letterheads
    const addLetterhead = (lh) => {
        const newItem = { ...lh, id: Date.now().toString() };
        setLetterheads(prev => {
            const next = [...prev, newItem];
            localStorage.setItem('letterheads', JSON.stringify(next));
            return next;
        });
    };

    const updateLetterhead = (id, updates) => {
        setLetterheads(prev => {
            const next = prev.map(lh => lh.id === id ? { ...lh, ...updates } : lh);
            localStorage.setItem('letterheads', JSON.stringify(next));
            return next;
        });
    };

    const deleteLetterhead = (id) => {
        setLetterheads(prev => {
            const next = prev.filter(lh => lh.id !== id);
            localStorage.setItem('letterheads', JSON.stringify(next));
            return next;
        });
    };

    // Office Notes
    const addOfficeNote = async (note) => {
        const newItem = { ...note, id: Date.now().toString(), date: new Date().toISOString() };
        await idb.add('officeNotes', newItem);
        setOfficeNotes(prev => [...prev, newItem]);
    };

    // Letters
    const addLetter = async (letter) => {
        const newItem = { ...letter, id: Date.now().toString(), date: new Date().toISOString() };
        await idb.add('letters', newItem);
        setLetters(prev => [...prev, newItem]);
    };

    const updateLetter = async (id, updates) => {
        const item = letters.find(l => l.id === id);
        if (item) {
            const updatedItem = { ...item, ...updates };
            await idb.put('letters', updatedItem);
            setLetters(prev => prev.map(l => l.id === id ? updatedItem : l));
        }
    };

    const deleteLetter = async (id) => {
        await idb.remove('letters', id);
        setLetters(prev => prev.filter(l => l.id !== id));
    };

    // Circulars
    const addCircular = async (circular) => {
        const newItem = { ...circular, id: Date.now().toString(), date: new Date().toISOString() };
        await idb.add('circulars', newItem);
        setCirculars(prev => [...prev, newItem]);
    };

    const updateCircular = async (id, updates) => {
        const item = circulars.find(c => c.id === id);
        if (item) {
            const updatedItem = { ...item, ...updates };
            await idb.put('circulars', updatedItem);
            setCirculars(prev => prev.map(c => c.id === id ? updatedItem : c));
        }
    };

    const deleteCircular = async (id) => {
        await idb.remove('circulars', id);
        setCirculars(prev => prev.filter(c => c.id !== id));
    };

    const value = {
        isLoading,
        branches,
        settings,
        letterheads,
        addLetterhead,
        updateLetterhead,
        deleteLetterhead,
        officeNotes,
        addOfficeNote,
        letters,
        addLetter,
        updateLetter,
        deleteLetter,
        circulars,
        addCircular,
        updateCircular,
        deleteCircular
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
