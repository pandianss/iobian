const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'server', 'db.json');
try {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const user = data.users.find(u => u.roll_number === '59111');
    if (user) {
        console.log("ROLE:", user.role);
        console.log("OFFICE_LEVEL:", user.office_level);
        console.log("LINKED_REGION:", user.linked_region_code);
        console.log("LINKED_BRANCH:", user.linked_branch_code);
    } else {
        console.log("User not found");
    }
} catch (e) { console.error(e); }
