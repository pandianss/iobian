const fs = require('fs');
const path = require('path');
const mockData = require('./mockData');

const DB_PATH = path.join(__dirname, 'db.json');

const loadData = () => {
    if (fs.existsSync(DB_PATH)) {
        try {
            const data = fs.readFileSync(DB_PATH, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error("Error reading db.json, falling back to mockData:", err);
            return { ...mockData };
        }
    } else {
        // Initialize with default mockData
        saveData(mockData);
        return { ...mockData };
    }
};

const saveData = (data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error("Error saving to db.json:", err);
    }
};

module.exports = { loadData, saveData };
