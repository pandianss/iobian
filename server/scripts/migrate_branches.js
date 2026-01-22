const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

try {
    if (fs.existsSync(dbPath)) {
        const raw = fs.readFileSync(dbPath);
        const data = JSON.parse(raw);
        let count = 0;

        // 1. Move ALL branches to Dindigul Region (3933)
        if (data.orgMaster && Array.isArray(data.orgMaster)) {
            data.orgMaster.forEach(b => {
                b.region_code = '3933';
                count++;
            });
            console.log(`Updated ${count} branches to Region Code 3933 (Dindigul)`);
        }

        // 2. Move RO User (User ID 3) to Dindigul
        if (data.users && Array.isArray(data.users)) {
            const roUser = data.users.find(u => u.user_id === 3);
            if (roUser) {
                roUser.linked_region_code = '3933';
                console.log('Updated RO User (ID 3) to Region Code 3933');
            }
        }

        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
        console.log('Migration successful.');
    } else {
        console.log('db.json not found, using mockData defaults on next restart.');
    }
} catch (e) {
    console.error('Migration failed:', e);
}
