const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const dir = path.join(__dirname, 'data', 'key_params');
console.log('Checking dir:', dir);

if (!fs.existsSync(dir)) {
    console.log('Dir not found');
    process.exit(1);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.xlsx') || f.endsWith('.xls') || f.endsWith('.csv'));
console.log('Files found:', files);

files.forEach(file => {
    const filePath = path.join(dir, file);
    console.log('Reading:', filePath);
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        console.log('Sheet Name:', sheetName);
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        console.log('Row count:', data.length);
        if (data.length > 0) {
            console.log('First row keys:', Object.keys(data[0]));
        }
    } catch (e) {
        console.error('Error reading file:', e);
    }
});
