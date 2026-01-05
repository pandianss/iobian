const persistence = require('./server/persistence');
const fs = require('fs');

const data = persistence.loadData();
const row = data.key_params.find(r => (r['Region Name'] || '').toLowerCase().includes('dindigul'));

fs.writeFileSync('dindigul_row.json', JSON.stringify(row, null, 2));
console.log('Written to dindigul_row.json');
console.log('Business:', row['Business']);
console.log('Deposits:', row['Deposits']);
console.log('Advances:', row['Advances']);
