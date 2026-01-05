// Deleted test file
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, 'data', 'core_agri');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.csv'));

if (files.length > 0) {
    const filePath = path.join(dir, files[0]);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet, { defval: "" });

    if (jsonData.length > 0) {
        // Log as JSON string to ensure no truncation or fancy formatting issues
        console.log(JSON.stringify(Object.keys(jsonData[0])));
    }
}
