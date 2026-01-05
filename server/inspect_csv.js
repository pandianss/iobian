const fs = require('fs');
const csv = require('csv-parser');

const filePath = 'c:\\Users\\Acer\\Videos\\iobian_v1\\iobian\\data\\verticals\\SME_REPORTS - 2025-12-30T111010.679.csv';

let count = 0;
fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
        if (count < 5) {
            const rawBal = row['NET_BALANCE '];
            const parsed = parseFloat(rawBal);
            console.log(`Row ${count}: BalRaw='${rawBal}' Parsed=${parsed} Type=${typeof parsed}`);
            count++;
        } else {
            process.exit(0);
        }
    });
