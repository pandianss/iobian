const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const folder = path.join(__dirname, 'data/cash');

if (!fs.existsSync(folder)) {
    console.log('Folder not found:', folder);
    process.exit(1);
}

const files = fs.readdirSync(folder).filter(f => f.endsWith('.csv') || f.endsWith('.xlsx'));

if (files.length === 0) {
    console.log('No files found in data/cash');
    process.exit(0);
}

const file = files[0];
const filePath = path.join(folder, file);

console.log('Reading file:', file);

const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);

// fs already imported above
// ... (imports)

// ... (existing logic)

const outputObj = {
    file: file,
    keys: Object.keys(data[0] || {}),
    record: data[0]
};

fs.writeFileSync('debug_cash_output.txt', JSON.stringify(outputObj, null, 2));
console.log('Written to debug_cash_output.txt');
