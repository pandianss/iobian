const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

console.log('Loading db.json...');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

let changes = 0;

// Function to convert string numbers to actual numbers
const normalizeCode = (value) => {
    if (typeof value === 'string' && /^\d+$/.test(value)) {
        changes++;
        return parseInt(value, 10);
    }
    return value;
};

// Normalize region codes
if (db.regions) {
    db.regions.forEach(region => {
        region.region_code = normalizeCode(region.region_code);
    });
}

// Normalize branch codes and region codes in orgMaster
if (db.orgMaster) {
    db.orgMaster.forEach(branch => {
        branch.branch_code = normalizeCode(branch.branch_code);
        branch.region_code = normalizeCode(branch.region_code);
        if (branch.pincode) branch.pincode = normalizeCode(branch.pincode);
    });
}

// Normalize user codes
if (db.users) {
    db.users.forEach(user => {
        if (user.linked_branch_code) {
            user.linked_branch_code = normalizeCode(user.linked_branch_code);
        }
        if (user.linked_region_code) {
            user.linked_region_code = normalizeCode(user.linked_region_code);
        }
        // Keep roll_number as string (it's an ID, not a numeric code)
        // Keep department codes as strings (they are 4-digit codes like "1001")
    });
}

console.log(`Total conversions made: ${changes}`);

// Backup original file
const backupPath = path.join(__dirname, 'db.backup.json');
console.log('Creating backup at db.backup.json...');
fs.writeFileSync(backupPath, fs.readFileSync(dbPath));

// Write normalized data
console.log('Writing normalized data to db.json...');
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

console.log('✓ Normalization complete!');
console.log('✓ Backup saved as db.backup.json');
