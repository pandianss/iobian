const xlsx = require('xlsx');
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
        const schemes = new Set();
        const loanTypes = new Set();
        const activities = new Set();

        jsonData.forEach(row => {
            const scheme = (row['SCHM_CODE'] || row['Scheme Code'] || '').toString().trim().toUpperCase();
            if (scheme) schemes.add(scheme);

            const lt = (row['LOAN TYPE'] || row['Loan Type'] || '').toString().trim().toUpperCase();
            if (lt) loanTypes.add(lt);

            const act = (row['ACTIVITY_CD'] || row['Activity Code'] || '').toString().trim().toUpperCase();
            if (act) activities.add(act);
        });
        console.log('Schemes:', Array.from(schemes).sort());
        console.log('Loan Types:', Array.from(loanTypes).sort());
        console.log('Activities:', Array.from(activities).sort());
        console.log('Sample Row:', jsonData[0]);
    } else {
        console.log('No data found.');
    }
} else {
    console.log('No CSV files found.');
}
