const express = require('express');
const router = express.Router();
const persistence = require('../persistence');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');

const processFolder = (folderName, dataKey, metaKey, db) => {
    const dir = path.join(__dirname, '..', '..', 'data', folderName);
    if (!fs.existsSync(dir)) {
        if (!db[dataKey]) db[dataKey] = [];
        return { count: 0 };
    }
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.xlsx') || f.endsWith('.xls') || f.endsWith('.csv'));
    let allData = [];
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        let jsonData = xlsx.utils.sheet_to_json(sheet, { defval: "" });
        allData = allData.concat(jsonData.map(row => ({ ...row, 'Source File': file, 'Import Date': new Date().toISOString() })));
    });
    db[dataKey] = allData;
    db[metaKey] = { lastSync: new Date().toISOString(), count: allData.length };
    return { count: allData.length };
};

router.get('/sanctions', (req, res) => {
    const mockData = persistence.loadData();
    res.json({
        success: true,
        data: mockData.sanctions || [],
        meta: mockData.sanctions_meta || {}
    });
});

router.post('/sanctions/sync', (req, res) => {
    const mockData = persistence.loadData();
    const stats = processFolder('sanctions', 'sanctions', 'sanctions_meta', mockData);
    persistence.saveData(mockData);
    res.json({ success: true, stats: mockData.sanctions_meta });
});

module.exports = router;
