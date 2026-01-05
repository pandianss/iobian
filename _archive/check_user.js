const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'server', 'db.json');
try {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const user = data.users.find(u => u.roll_number === '59111'); // Krishna Kumar S
    console.log(JSON.stringify(user, null, 2));
} catch (e) { console.error(e); }
