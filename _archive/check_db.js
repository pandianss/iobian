const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'server/db.json');

try {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    console.log("Downgraded Accounts count:", (data.downgraded_accounts || []).length);
    if (data.downgraded_accounts && data.downgraded_accounts.length > 0) {
        console.log("First Record Keys:", Object.keys(data.downgraded_accounts[0]));
    } else {
        console.log("No Downgraded Accounts data found.");
    }
} catch (e) {
    console.error("Error:", e.message);
}
