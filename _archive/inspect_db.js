const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
try {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(raw);
    if (db.sanctions && db.sanctions.length > 0) {
        const row = db.sanctions[0];
        console.log('TYPE:', row.type);
        console.log('SCHEME:', row.schemeCode);
        console.log('BALANCE:', row.balance);
        console.log('GL_SUB:', row.glSubHeadCode);
    } else {
        console.log('EMPTY');
    }
} catch (e) {
    console.log('ERR');
}
