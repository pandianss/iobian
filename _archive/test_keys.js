// Deleted test file
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, 'data', 'core_agri');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.csv'));

if (files.length > 0) {
    const filePath = path.join(dir, files[0]);
    console.log('Reading file:', filePath);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet, { defval: "" });

    if (jsonData.length > 0) {
        console.log('First Row Keys:', Object.keys(jsonData[0]));
        console.log('First Row Data:', jsonData[0]);
    } else {
        console.log('No data found in file.');
    }
} else {
    console.log('No CSV files found in core_agri.');
}
