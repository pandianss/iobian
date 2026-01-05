const fs = require('fs');
const csv = require('csv-parser');

const filePath = 'c:\\Users\\Acer\\Videos\\iobian_v1\\iobian\\data\\verticals\\SME_REPORTS - 2025-12-30T111010.679.csv';

console.log('Reading file:', filePath);

fs.createReadStream(filePath)
    .pipe(csv())
    .on('headers', (headers) => {
        console.log('Headers found:', headers);
        process.exit(0);
    });
