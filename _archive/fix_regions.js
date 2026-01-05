const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'server', 'db.json');

try {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    // Check if region '3933' exists
    const r3933 = data.regions.find(r => r.region_code === '3933');
    const rR05 = data.regions.find(r => r.region_code === 'R05');

    console.log("Region 3933:", r3933);
    console.log("Region R05:", rR05);

    // Normalize Users to R05 if they are in 3933 and it duplicates R05
    let updated = false;
    data.users.forEach(u => {
        if ((u.roll_number === '59111' || u.roll_number === '36614') && u.linked_region_code === '3933') {
            console.log(`Updating ${u.full_name} from 3933 to R05`);
            u.linked_region_code = 'R05';
            updated = true;
        }
    });

    if (updated) {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
        console.log("Successfully normalized user region codes to R05.");
    } else {
        console.log("No updates needed.");
    }

} catch (err) {
    console.error(err);
}
