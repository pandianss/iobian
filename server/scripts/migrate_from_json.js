const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const legacyDataPath = path.resolve(__dirname, '../../data/db.json');

async function migrate() {
    console.log('Starting Migration...');

    if (!fs.existsSync(legacyDataPath)) {
        console.error('db.json not found!');
        process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(legacyDataPath, 'utf8'));

    // 1. Migrate Regions
    if (data.regions) {
        console.log(`Migrating ${data.regions.length} Regions...`);
        for (const region of data.regions) {
            try {
                const code = String(region.region_code);
                await prisma.region.upsert({
                    where: { region_code: code },
                    update: {},
                    create: {
                        region_code: code,
                        region_name: region.region_name,
                        region_name_hindi: region.region_name_hindi,
                        region_name_local: region.region_name_local,
                        is_deleted: region.is_deleted || false
                    }
                });
            } catch (e) {
                console.error(`Failed to migrate Region ${region.region_code}:`, e.message);
            }
        }
    }

    // ... (truncated for brevity, but I should include full logic or I will lose it)
    // I will just include the rest of the logic here to be safe

    // 2. Migrate Branches
    if (data.orgMaster) {
        console.log(`Migrating ${data.orgMaster.length} Branches...`);
        for (const branch of data.orgMaster) {
            try {
                const bCode = String(branch.branch_code);
                const rCode = branch.region_code ? String(branch.region_code) : null;
                await prisma.branch.upsert({
                    where: { branch_code: bCode },
                    update: {},
                    create: {
                        branch_code: bCode,
                        branch_name: branch.branch_name,
                        region_code: rCode,
                        state: branch.state,
                        district: branch.district,
                        taluk: branch.taluk,
                        revenue_centre: branch.revenue_centre,
                        locality: branch.locality,
                        pincode: String(branch.pincode || ''),
                        latitude: String(branch.latitude || ''),
                        longitude: String(branch.longitude || ''),
                        category: branch.category,
                        branch_type: branch.type,
                        is_deleted: branch.is_deleted || false
                    }
                });
            } catch (e) {
                console.error(`Failed to migrate Branch ${branch.branch_code}:`, e.message);
            }
        }
    }

    // 3. Migrate Users
    if (data.users) {
        console.log(`Migrating ${data.users.length} Users...`);
        for (const user of data.users) {
            try {
                let depts = null;
                if (user.departments) depts = Array.isArray(user.departments) ? JSON.stringify(user.departments) : user.departments;
                let history = null;
                if (user.history) history = Array.isArray(user.history) ? JSON.stringify(user.history) : user.history;

                await prisma.user.upsert({
                    where: { roll_number: user.roll_number },
                    update: {},
                    create: {
                        roll_number: user.roll_number,
                        password_hash: user.password_hash || 'Welcome@123',
                        full_name: user.full_name,
                        full_name_hindi: user.full_name_hindi,
                        role: user.role,
                        office_level: user.office_level,
                        designation: user.designation,
                        designation_hindi: user.designation_hindi,
                        mobile: String(user.mobile || ''),
                        photo_url: user.photo_url,
                        is_head: user.is_head || false,
                        is_deleted: user.is_deleted || false,
                        must_change_password: user.must_change_password || false,
                        linked_branch_code: user.linked_branch_code ? String(user.linked_branch_code) : null,
                        linked_region_code: user.linked_region_code ? String(user.linked_region_code) : null,
                        departments: depts,
                        history: history
                    }
                });
            } catch (e) {
                console.error(`Failed to migrate User ${user.roll_number}:`, e.message);
            }
        }
    }

    // 4. Config
    if (data.bank_config) {
        const cfg = data.bank_config;
        await prisma.bankConfig.upsert({
            where: { id: 1 },
            update: {}, // Keep existing if valid
            create: {
                id: 1,
                name_english: cfg.name_english,
                name_hindi: cfg.name_hindi,
                name_local: cfg.name_local,
                dept_english: cfg.dept_english,
                dept_hindi: cfg.dept_hindi,
                dept_local: cfg.dept_local
            }
        });
    }

    console.log('Migration Complete.');
}

migrate()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


