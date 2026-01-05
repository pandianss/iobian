const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'server', 'db.json');
const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const users = data.users.filter(u => u.full_name.includes('Krishna') || u.full_name.includes('Chandra'));
console.log(JSON.stringify(users, null, 2));
