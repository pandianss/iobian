const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

// Legacy Data Paths
const DB_JSON_PATH = path.join(__dirname, '../../data/db.json');
const MOCK_DATA = require('../src/mockData');

async function main() {
    console.log("Starting Data Migration...");

    let legacyData;
    if (fs.existsSync(DB_JSON_PATH)) {
        console.log("Reading legacy db.json...");
        legacyData = JSON.parse(fs.readFileSync(DB_JSON_PATH, 'utf8'));
    } else {
        console.log("db.json not found, using mockData.js");
        legacyData = MOCK_DATA;
    }

    // 1. Migrate Regions
    console.log("Migrating Regions...");
    for (const r of (legacyData.regions || [])) {
        await prisma.region.upsert({
            where: { region_code: r.region_code },
            update: {},
            create: {
                region_code: r.region_code,
                region_name: r.region_name,
                region_name_hindi: r.region_name_hindi,
                region_name_local: r.region_name_local,
                region_address: r.region_address,
                region_address_hindi: r.region_address_hindi,
                region_address_local: r.region_address_local,
                head_office_code: r.head_office_code,
                is_deleted: r.is_deleted || false
            }
        });
    }

    // 2. Migrate OrgMaster (Branches)
    console.log("Migrating Branches...");
    for (const b of (legacyData.orgMaster || [])) {
        await prisma.branch.upsert({
            where: { branch_code: b.branch_code },
            update: {},
            create: {
                branch_code: b.branch_code,
                branch_name: b.branch_name,
                branch_type: b.branch_type || 'Branch',
                category: b.category,
                region_code: b.region_code,
                state: b.state,
                district: b.district,
                taluk: b.taluk,
                revenue_centre: b.revenue_centre,
                locality: b.locality,
                latitude: b.latitude,
                longitude: b.longitude,
                pincode: b.pincode,
                is_deleted: b.is_deleted || false
            }
        });
    }

    // 3. Migrate Users
    console.log("Migrating Users...");
    for (const u of (legacyData.users || [])) {
        await prisma.user.upsert({
            where: { roll_number: u.roll_number },
            update: {},
            create: {
                roll_number: u.roll_number,
                password_hash: u.password_hash || 'Welcome@123',
                role: u.role || 'Staff',
                office_level: u.office_level || 'Branch',
                full_name: u.full_name,
                full_name_hindi: u.full_name_hindi,
                mobile: u.mobile,
                designation: u.designation,
                designation_hindi: u.designation_hindi,
                is_head: u.is_head || false,
                is_deleted: u.is_deleted || false,
                must_change_password: u.must_change_password || false,
                linked_branch_code: u.linked_branch_code,
                linked_region_code: u.linked_region_code,
                departments: u.departments ? JSON.stringify(u.departments) : null,
                history: u.history ? JSON.stringify(u.history) : null
            }
        });
    }

    // 4. Migrate Divisions
    console.log("Migrating Divisions...");
    for (const d of (legacyData.divisions || [])) {
        await prisma.division.upsert({
            where: { name: d.name },
            update: {},
            create: { name: d.name }
        });
    }

    // 5. Migrate Designations
    console.log("Migrating Designations...");
    for (const d of (legacyData.designations || [])) {
        await prisma.designation.upsert({
            where: { title: d.title },
            update: {},
            create: {
                title: d.title,
                workclass: d.workclass || 0
            }
        });
    }

    // 6. Migrate Documents
    console.log("Migrating Documents...");
    for (const doc of (legacyData.documents || [])) {
        await prisma.document.upsert({
            where: { refNo: doc.refNo },
            update: {},
            create: {
                id: doc.id || undefined,
                category: doc.category,
                type: doc.type,
                subject: doc.subject,
                content: doc.content,
                refNo: doc.refNo,
                status: doc.status || 'Draft',
                formData: doc.formData ? JSON.stringify(doc.formData) : null,
                is_deleted: doc.is_deleted || false
            }
        });
    }

    // 7. Migrate Branch Surveys
    console.log("Migrating Branch Surveys...");
    for (const s of (legacyData.branch_surveys || [])) {
        await prisma.branchSurvey.upsert({
            where: { refNo: s.refNo },
            update: {},
            create: {
                refNo: s.refNo,
                region: s.region,
                applicationType: s.applicationType,
                date: s.date,
                branch_name: s.branch_name,
                formData: s.formData ? JSON.stringify(s.formData) : null,
                is_deleted: s.is_deleted || false
            }
        });
    }

    // 8. Bank Config
    console.log("Migrating Bank Config...");
    if (legacyData.bank_config) {
        await prisma.bankConfig.upsert({
            where: { id: 1 },
            update: legacyData.bank_config,
            create: legacyData.bank_config
        });
    }

    // 9. Interest Rates
    console.log("Migrating Interest Rates...");
    for (const r of (legacyData.interest_rates || [])) {
        await prisma.interestRate.create({
            data: {
                type: r.type,
                product: r.product,
                effectiveDate: r.effectiveDate,
                rate: r.rate,
                circular: r.circular,
                isAnyAmount: r.isAnyAmount !== undefined ? r.isAnyAmount : true,
                amountFrom: r.amountFrom || "",
                amountTo: r.amountTo || ""
            }
        });
    }

    console.log("Migration Completed Successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
