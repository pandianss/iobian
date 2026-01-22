const persistence = require('./persistence');

console.log('🔄 Migrating regions to support trilingual fields...\n');

const mockData = persistence.loadData();

let migrated = 0;
mockData.regions.forEach(region => {
    let updated = false;

    // Add missing trilingual fields with empty defaults
    if (!region.hasOwnProperty('region_name_local')) {
        region.region_name_local = '';
        updated = true;
    }
    if (!region.hasOwnProperty('region_address')) {
        region.region_address = '';
        updated = true;
    }
    if (!region.hasOwnProperty('region_address_hindi')) {
        region.region_address_hindi = '';
        updated = true;
    }
    if (!region.hasOwnProperty('region_address_local')) {
        region.region_address_local = '';
        updated = true;
    }

    if (updated) {
        migrated++;
        console.log(`✓ Migrated: ${region.region_name} (${region.region_code})`);
    }
});

if (migrated > 0) {
    persistence.saveData(mockData);
    console.log(`\n✅ Migration complete! ${migrated} region(s) updated.`);
    console.log('📝 All regions now support trilingual fields.');
} else {
    console.log('\n✓ No migration needed. All regions already have trilingual fields.');
}
