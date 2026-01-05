const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'server', 'db.json');

try {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    if (data.regions) {
        data.regions = data.regions.map(r => {
            if (r.region_code === 'R05') return { ...r, manager_name: 'Chandramouliswar R' };
            if (r.region_code === 'R01') return { ...r, manager_name: 'Rahul Gupta' };
            if (r.region_code === 'R02') return { ...r, manager_name: 'Priya Desai' };
            return r;
        });

        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
        console.log('Successfully updated regions in db.json');
    } else {
        console.error('No regions found in db.json');
    }
} catch (err) {
    console.error('Error updating db.json:', err);
}
