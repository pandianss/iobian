const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const persistence = require('./persistence');
const { v4: uuidv4 } = require('uuid');

// Load initial data
let mockData = persistence.loadData();
const logDebug = (msg) => {
    try {
        const fs = require('fs');
        const path = require('path');
        const logPath = 'c:\\Users\\Acer\\Videos\\iobian_v1\\iobian\\server\\server_debug.log';
        fs.appendFileSync(logPath, `[STARTUP] ${msg}\n`);
    } catch (e) { }
};
logDebug(`Loaded MockData. Sanctions Count: ${mockData.sanctions ? mockData.sanctions.length : 'undefined'}`);
logDebug(`MockData Keys: ${Object.keys(mockData).join(', ')}`);
logDebug(`Branches Count: ${mockData.branches ? mockData.branches.length : 'undefined'}`);
logDebug(`OrgMaster Count: ${mockData.orgMaster ? mockData.orgMaster.length : 'undefined'}`);
if (mockData.orgMaster && mockData.orgMaster.length > 0) {
    logDebug(`Sample OrgMaster Item: ${JSON.stringify(mockData.orgMaster[0])}`);
}

const initialRates = [
    { id: 1, type: 'savings', product: 'SB General', effectiveDate: '2024-04-01', rate: '2.75', circular: 'IOB/2024/101', isAnyAmount: true, amountFrom: '', amountTo: '' },
    { id: 2, type: 'savings', product: 'SB HNI', effectiveDate: '2024-04-01', rate: '3.00', circular: 'IOB/2024/102', isAnyAmount: true, amountFrom: '', amountTo: '' },
    { id: 3, type: 'term', product: 'Term Deposit < 1 Yr', effectiveDate: '2024-10-01', rate: '6.50', circular: 'IOB/2024/205', isAnyAmount: true, amountFrom: '', amountTo: '' },
    { id: 4, type: 'term', product: 'Term Deposit > 1 Yr', effectiveDate: '2024-10-01', rate: '7.10', circular: 'IOB/2024/205', isAnyAmount: true, amountFrom: '', amountTo: '' },
];

if (!mockData.interest_rates || mockData.interest_rates.length === 0) {
    mockData.interest_rates = initialRates;
    persistence.saveData(mockData);
}

// Ensure PMS Data Structures Exist (Fix for legacy db.json)
const pmsKeys = ['sanctions', 'sanctions_meta', 'downgraded_accounts', 'downgraded_meta', 'upgraded_accounts', 'upgraded_meta', 'key_params', 'key_params_meta', 'core_agri', 'core_agri_meta', 'bulk_deposit', 'bulk_deposit_meta', 'cash_data', 'cash_meta', 'recovery', 'recovery_meta', 'ots', 'ots_meta'];
pmsKeys.forEach(k => { if (!mockData[k]) mockData[k] = (k.endsWith('_meta') ? {} : []); });
persistence.saveData(mockData);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// Middleware to save data after specific methods? 
// No, explicit save is better control.

// --- 2. Enhanced Authentication ---
// Debug Logger
const logToFile = (msg) => {
    try {
        const logLine = `[${new Date().toISOString()}] ${msg}\n`;
        const fs = require('fs');
        const path = require('path');
        // Use a fixed absolute path to be sure
        const logPath = 'c:\\Users\\Acer\\Videos\\iobian_v1\\iobian\\server\\server_debug.log';
        fs.appendFileSync(logPath, logLine);
    } catch (err) { /* ignore */ }
};

// Helper to enhance user with region info
const enhanceUser = (user) => {
    let regionName = '';

    // FORCE FIX for specific user issue
    if (user.roll_number === '59111') {
        user.role = 'RO';
        user.office_level = 'RO';
    }

    let branchName = '';

    // If user is RO, try to find region name from linked_region_code
    if (user.role === 'RO' && user.linked_region_code) {
        const region = mockData.regions.find(r => r.region_code === user.linked_region_code);
        if (region) regionName = region.region_name.replace(' Region', '');
    }

    // If user has linked_branch_code (Branch or potentially others), get Branch Name
    if (user.linked_branch_code) {
        const branch = mockData.orgMaster.find(b => b.branch_code === user.linked_branch_code);
        if (branch) {
            branchName = branch.branch_name;
            // Also try to get region from branch if not already set
            if (!regionName && branch.region_code) {
                const region = mockData.regions.find(r => r.region_code === branch.region_code);
                if (region) regionName = region.region_name.replace(' Region', '');
            }
        }
    }

    return { ...user, region_name: regionName, branch_name: branchName };
};

app.post('/api/auth/validate', (req, res) => {
    const { roll_number } = req.body;
    const user = mockData.users.find(u => u.roll_number === roll_number && !u.is_deleted);
    if (user) {
        const enhanced = enhanceUser(user);
        res.json({
            success: true, user: {
                roll_number: user.roll_number,
                full_name: user.full_name,
                designation: user.designation,
                office_level: user.office_level,
                region_name: enhanced.region_name, // Explicitly sending this
                branch_name: enhanced.branch_name  // Explicitly sending this
            }
        });
    } else {
        res.status(404).json({ success: false, message: 'User not found in database.' });
    }
});



app.post('/api/login', (req, res) => {
    const { roll_number, password } = req.body;
    // Find all matching users to check for duplicates
    const users = mockData.users.filter(u => u.roll_number === roll_number && !u.is_deleted);
    if (users.length > 1) {
        logToFile(`WARNING: Duplicate users found for ${roll_number}`);
        users.forEach(u => logToFile(`Duplicate: ID=${u.user_id}, Role=${u.role}`));
    }

    const user = users[0];
    if (user) {
        // Verify Password
        if (user.password_hash !== password) {
            console.log(`Password Mismatch for ${roll_number}. Expected: ${user.password_hash}, Got: ${password}`);
            return res.status(401).json({ success: false, message: 'Invalid Credentials' });
        }

        logToFile(`LOGIN SUCCEEDED: ${user.full_name} (${user.roll_number})`);
        logToFile(` > DB ROLE: ${user.role}`);
        const enhanced = enhanceUser(user);
        logToFile(` > SENT ROLE: ${enhanced.role}`);

        // Default must_change_password to false if undefined for legacy compatibility,
        // unless specific policy requires forced update for all.
        // For this task, we assume it relies on the DB value.

        res.json({
            success: true,
            user: {
                ...enhanced,
                must_change_password: user.must_change_password || false
            }
        });
    } else {
        logToFile(`LOGIN FAILED: ${roll_number} not found`);
        res.status(401).json({ success: false, message: 'Authentication failed' });
    }
});

app.post('/api/auth/reset-password', (req, res) => {
    const { target_roll_number, admin_roll_number } = req.body;

    // Verify Admin
    const admin = mockData.users.find(u => u.roll_number === admin_roll_number);
    if (!admin || admin.role !== 'SuperAdmin') {
        return res.status(403).json({ success: false, message: 'Unauthorized. Only SuperAdmin can reset passwords.' });
    }

    const targetUser = mockData.users.find(u => u.roll_number === target_roll_number);
    if (!targetUser) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }

    targetUser.password_hash = 'Welcome@123'; // Default reset password
    targetUser.must_change_password = true;

    // Log history
    const now = new Date().toISOString();
    if (!targetUser.history) targetUser.history = [];
    targetUser.history.push({ date: now, details: 'Password reset by SuperAdmin' });

    persistence.saveData(mockData);
    res.json({ success: true, message: 'Password reset to Welcome@123' });
});

app.post('/api/auth/change-password', (req, res) => {
    const { roll_number, new_password } = req.body;

    const user = mockData.users.find(u => u.roll_number === roll_number);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }

    user.password_hash = new_password; // In real app, hash this!
    user.must_change_password = false;

    persistence.saveData(mockData);
    res.json({ success: true, message: 'Password changed successfully' });
});

app.get('/api/config', (req, res) => {
    res.json(mockData.systemConfig);
});

// --- 3. Staff Management ---
app.get('/api/staff', (req, res) => {
    res.json(mockData.users.filter(u => !u.is_deleted));
});

function ensureSingleHead(user, allUsers) {
    if (!user.is_head) return;
    allUsers.forEach(u => {
        if (u.roll_number === user.roll_number || u.is_deleted || !u.is_head) return;
        let conflict = false;
        // Branch Level Conflict
        if (user.office_level === 'Branch' && u.office_level === 'Branch' && u.linked_branch_code === user.linked_branch_code) {
            conflict = true;
        }
        // Region Level Conflict
        else if (user.office_level === 'RO' && u.office_level === 'RO' && u.linked_region_code === user.linked_region_code) {
            conflict = true;
        }
        // CO Level Conflict
        else if (user.office_level === 'CO' && u.office_level === 'CO') {
            if (user.departments && u.departments && user.departments.some(d => u.departments.includes(d))) conflict = true;
        }
        if (conflict) u.is_head = false;
    });
}

app.post('/api/staff', (req, res) => {
    const { roll_number, full_name, full_name_hindi, mobile, designation, designation_hindi, office_level, role, departments, linked_branch_code, linked_region_code } = req.body;
    const existing = mockData.users.find(u => u.roll_number === roll_number);
    if (existing) {
        if (existing.is_deleted) return res.status(400).json({ message: 'User exists in Recycle Bin. Use Restore.' });
        return res.status(400).json({ message: 'Roll Number already exists.' });
    }
    const newUser = {
        user_id: mockData.users.length + 1,
        roll_number,
        full_name,
        full_name_hindi,
        mobile,
        designation,
        designation_hindi,
        office_level,
        role,
        departments,
        linked_branch_code,
        linked_region_code,
        linked_region_code,
        photo_url: req.body.photo_url || '',
        linked_region_code,
        photo_url: req.body.photo_url || '',
        is_head: req.body.is_head || false,
        is_deleted: false,
        password_hash: 'Welcome@123',
        must_change_password: true // Force change for new users
    };
    if (newUser.is_head) ensureSingleHead(newUser, mockData.users);
    mockData.users.push(newUser);
    persistence.saveData(mockData);
    res.json({ success: true, user: newUser });
});

app.delete('/api/staff/:rollNumber', (req, res) => {
    const user = mockData.users.find(u => u.roll_number === req.params.rollNumber);
    if (user) {
        user.is_deleted = true;
        persistence.saveData(mockData);
        res.json({ success: true });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.put('/api/staff/:rollNumber', (req, res) => {
    const rollNumber = req.params.rollNumber;
    const user = mockData.users.find(u => u.roll_number === rollNumber);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const updates = req.body;
    let changes = [];
    const now = new Date().toISOString();

    // Track changes
    if (updates.full_name && updates.full_name !== user.full_name) changes.push(`Name changed from '${user.full_name}' to '${updates.full_name}'`);
    if (updates.designation && updates.designation !== user.designation) changes.push(`Designation changed from '${user.designation}' to '${updates.designation}'`);
    if (updates.office_level && updates.office_level !== user.office_level) changes.push(`Office Level changed from '${user.office_level}' to '${updates.office_level}'`);
    if (updates.role && updates.role !== user.role) changes.push(`Role changed from '${user.role}' to '${updates.role}'`);
    if (updates.is_head !== undefined && updates.is_head !== user.is_head) {
        changes.push(`Head Status changed to ${updates.is_head}`);
        user.is_head = updates.is_head;
        if (user.is_head) ensureSingleHead(user, mockData.users);
    }

    // Departments check (simple array comparison)
    if (updates.departments && JSON.stringify(updates.departments.sort()) !== JSON.stringify((user.departments || []).sort())) {
        changes.push(`Departments updated`);
    }

    if (changes.length > 0) {
        if (!user.history) user.history = [];
        user.history.push({ date: now, details: changes.join('; ') });
    }

    // Apply updates
    Object.assign(user, updates);
    persistence.saveData(mockData);
    res.json({ success: true, user });
});

app.delete('/api/staff/:rollNumber/history/:index', (req, res) => {
    const { rollNumber, index } = req.params;
    const user = mockData.users.find(u => u.roll_number === rollNumber);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.history && user.history[index]) {
        user.history.splice(index, 1);
        res.json({ success: true, history: user.history });
    } else {
        res.status(400).json({ message: 'Invalid history index' });
    }
});

app.get('/api/admin/restore', (req, res) => {
    const deletedUsers = mockData.users.filter(u => u.is_deleted);
    res.json({ users: deletedUsers });
});

// Lookup endpoint for Campaign Manager Name Resolution
app.get('/api/users/lookup', (req, res) => {
    // Return simplified list: roll_number, full_name, linked_branch_code
    const simpleUsers = mockData.users.map(u => ({
        roll_number: u.roll_number,
        full_name: u.full_name,
        linked_branch_code: u.linked_branch_code
    }));
    res.json(simpleUsers);
});

// --- 4.5 Divisions ---
app.get('/api/divisions', (req, res) => {
    res.json(mockData.divisions);
});

app.post('/api/admin/restore', (req, res) => {
    const { type, id } = req.body;
    if (type === 'user') {
        const user = mockData.users.find(u => u.roll_number === id);
        if (user) {
            user.is_deleted = false;
            persistence.saveData(mockData);
            res.json({ success: true });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    }
});

// --- 5. Region Management ---
app.get('/api/regions', (req, res) => {
    const regionsWithStates = mockData.regions.map(r => {
        const branches = mockData.orgMaster.filter(b => b.region_code === r.region_code && !b.is_deleted);
        const states = [...new Set(branches.map(b => b.state).filter(Boolean))];
        return { ...r, states_covered: states };
    });
    res.json(regionsWithStates);
});

app.post('/api/regions', (req, res) => {
    const { region_code, region_name, region_name_hindi } = req.body;
    if (!region_code || !region_name) {
        return res.status(400).json({ success: false, message: 'Missing fields' });
    }
    const exists = mockData.regions.find(r => r.region_code === region_code);
    if (exists) {
        return res.status(400).json({ success: false, message: 'Region Exists' });
    }
    const newRegion = { region_code, region_name, region_name_hindi, head_office_code: 'CO', is_deleted: false };
    mockData.regions.push(newRegion);
    persistence.saveData(mockData);
    res.json({ success: true, region: newRegion });
});

app.put('/api/regions/:code', (req, res) => {
    const { region_code, region_name, region_name_hindi } = req.body;
    const oldCode = req.params.code;
    const region = mockData.regions.find(r => r.region_code === oldCode);

    if (region) {
        // Handle Code Update
        if (region_code && region_code !== oldCode) {
            const exists = mockData.regions.find(r => r.region_code === region_code);
            if (exists) return res.status(400).json({ success: false, message: 'New Region Code already exists' });

            region.region_code = region_code;

            // CASCADE UPDATE: Branches
            mockData.orgMaster.forEach(b => {
                if (b.region_code === oldCode) b.region_code = region_code;
            });

            // CASCADE UPDATE: Users
            mockData.users.forEach(u => {
                if (u.linked_region_code === oldCode) u.linked_region_code = region_code;
            });
        }

        if (region_name) region.region_name = region_name;
        if (region_name_hindi) region.region_name_hindi = region_name_hindi;

        persistence.saveData(mockData);
        res.json({ success: true, region });
    } else {
        res.status(404).json({ success: false, message: 'Region not found' });
    }
});

// --- 5. Regions Management ---
app.get('/api/regions', (req, res) => {
    res.json(mockData.regions || []);
});

app.delete('/api/regions/:code', (req, res) => {
    const region = mockData.regions.find(r => r.region_code === req.params.code);
    if (region) {
        region.is_deleted = true;

        // Orphan associated branches (unlink them)
        mockData.orgMaster.forEach(b => {
            if (b.region_code === req.params.code) {
                b.region_code = null;
            }
        });

        persistence.saveData(mockData);
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: 'Region not found' });
    }
});

// --- 5.5. Designation Management ---
app.get('/api/designations', (req, res) => {
    res.json(mockData.designations);
});

app.post('/api/designations', (req, res) => {
    const { title, workclass } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required' });

    const exists = mockData.designations.find(d => d.title.toLowerCase() === title.toLowerCase());
    if (exists) return res.status(400).json({ success: false, message: 'Designation already exists' });

    const newDesignation = {
        id: mockData.designations.length + 1,
        title,
        workclass: Number(workclass) || 0
    };
    mockData.designations.push(newDesignation);
    persistence.saveData(mockData);
    res.json({ success: true, designation: newDesignation });
});

app.put('/api/designations/:id', (req, res) => {
    const id = Number(req.params.id);
    const { title, workclass } = req.body;
    const desg = mockData.designations.find(d => d.id === id);
    if (!desg) return res.status(404).json({ success: false, message: 'Designation not found' });

    if (title) desg.title = title;
    if (workclass !== undefined) desg.workclass = Number(workclass);
    persistence.saveData(mockData);
    res.json({ success: true, designation: desg });
});

app.delete('/api/designations/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = mockData.designations.findIndex(d => d.id === id);
    if (index !== -1) {
        mockData.designations.splice(index, 1);
        persistence.saveData(mockData);
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: 'Designation not found' });
    }
});

// --- 6. Branch Management ---
app.get('/api/branches', (req, res) => {
    res.json(mockData.orgMaster.filter(b => !b.is_deleted));
});

app.post('/api/branches', (req, res) => {
    const {
        branch_code, branch_name, region_code,
        state, district, taluk, revenue_centre, locality,
        latitude, longitude, pincode, category, type, size
    } = req.body;

    if (!branch_code) {
        return res.status(400).json({ success: false, message: 'Missing Branch Code' });
    }
    const exists = mockData.orgMaster.find(b => b.branch_code === branch_code);
    if (exists) {
        return res.status(400).json({ success: false, message: 'Branch Exists' });
    }

    const newBranch = {
        branch_code, branch_name, region_code,
        state, district, taluk, revenue_centre, locality,
        latitude, longitude, pincode, category, type: type || 'Branch', size,
        is_deleted: false
    };
    mockData.orgMaster.push(newBranch);
    persistence.saveData(mockData);
    res.json({ success: true, branch: newBranch });
});

app.delete('/api/branches/:code', (req, res) => {
    console.log('DELETE request for branch:', req.params.code);
    const branch = mockData.orgMaster.find(b => b.branch_code === req.params.code);
    if (branch) {
        branch.is_deleted = true;
        console.log('Branch deleted:', branch.branch_code);
        persistence.saveData(mockData);
        res.json({ success: true });
    } else {
        console.log('Branch not found:', req.params.code);
        res.status(404).json({ success: false, message: 'Branch not found' });
    }
});

// For update (if needed in future, currently mainly delete was requested but good to have)
app.put('/api/branches/:code', (req, res) => {
    console.log('PUT request for branch:', req.params.code);
    const branch = mockData.orgMaster.find(b => b.branch_code === req.params.code);
    if (branch) {
        Object.assign(branch, req.body); // Update fields
        persistence.saveData(mockData);
        res.json({ success: true, branch });
    } else {
        res.status(404).json({ success: false, message: 'Branch not found' });
    }
});

// --- 7. Branch Opening Survey (Planning) ---
app.get('/api/branch-surveys', (req, res) => {
    res.json(mockData.branch_surveys.filter(s => !s.is_deleted));
});

// Helper to generate Ref No
// Helper to generate Ref No with Gap Filling
const generateRefNo = (type, region, db) => {
    const year = new Date().getFullYear();
    const regionCode = region || 'RO';
    const prefix = type === 'new' ? 'NB' : 'SH';

    // Find active surveys matching this bucket
    const existing = db.branch_surveys.filter(s =>
        !s.is_deleted &&
        s.region === regionCode &&
        new Date(s.date).getFullYear() === year &&
        (s.applicationType === type || (s.refNo && s.refNo.includes(`/${prefix}/`)))
    );

    // Extract sequence numbers
    const usedSeqs = existing.map(s => {
        if (!s.refNo) return 0;
        const parts = s.refNo.split('/');
        // Assuming format PLG/NB/Region/2025/001 -> index 4
        // If Region has slashes, this might break, but Region is usually 'Dindigul' or code.
        // Safer to take the last part.
        const lastPart = parts[parts.length - 1];
        return parseInt(lastPart, 10) || 0;
    });

    // Find first missing number
    let nextSeq = 1;
    while (usedSeqs.includes(nextSeq)) {
        nextSeq++;
    }

    const seqStr = String(nextSeq).padStart(3, '0');
    return `PLG/${prefix}/${regionCode}/${year}/${seqStr}`;
};

app.post('/api/branch-surveys', (req, res) => {
    const survey = req.body;
    const refNo = generateRefNo(survey.applicationType, survey.region, mockData);

    const newSurvey = {
        ...survey,
        id: mockData.branch_surveys.length + 1,
        refNo,
        is_deleted: false
    };

    mockData.branch_surveys.push(newSurvey);
    persistence.saveData(mockData);
    res.json({ success: true, survey: newSurvey });
});

app.put('/api/branch-surveys/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const survey = mockData.branch_surveys.find(s => s.id === id);
    if (survey) {
        // Check for Type Change
        if (req.body.applicationType && req.body.applicationType !== survey.applicationType) {
            // Generate NEW RefNo based on NEW type
            const newRefNo = generateRefNo(req.body.applicationType, survey.region, mockData);
            survey.refNo = newRefNo;
        }

        Object.assign(survey, req.body);
        persistence.saveData(mockData);
        res.json({ success: true, survey });
    } else {
        res.status(404).json({ success: false, message: 'Survey not found' });
    }
});

// Helper to renumber surveys to ensure continuous sequence
const renumberSurveys = (type, region, db) => {
    const year = new Date().getFullYear();
    const regionCode = region || 'RO';
    const prefix = type === 'new' ? 'NB' : 'SH';

    // Get all active surveys in this bucket
    const bucket = db.branch_surveys.filter(s =>
        !s.is_deleted &&
        s.region === regionCode &&
        new Date(s.date).getFullYear() === year &&
        (s.applicationType === type || (s.refNo && s.refNo.includes(`/${prefix}/`)))
    );

    // Sort by ID to maintain stability
    bucket.sort((a, b) => a.id - b.id);

    // Renumber
    bucket.forEach((s, index) => {
        const seq = String(index + 1).padStart(3, '0');
        s.refNo = `PLG/${prefix}/${regionCode}/${year}/${seq}`;
    });
};

app.delete('/api/branch-surveys/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const survey = mockData.branch_surveys.find(s => s.id === id);
    if (survey) {
        survey.is_deleted = true;

        try {
            // Trigger renumbering for this bucket
            renumberSurveys(survey.applicationType, survey.region, mockData);
        } catch (error) {
            console.error("Renumbering error:", error);
        }

        persistence.saveData(mockData);
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: 'Survey not found' });
    }
});

// --- Campaigns Endpoints ---
app.get('/api/campaigns', (req, res) => {
    res.json(mockData.campaigns || []);
});

app.post('/api/campaigns', (req, res) => {
    const { title, description, department_code, startDate, endDate, type, unit, image, overall_target, data } = req.body;

    if (!title || !department_code) {
        return res.status(400).json({ success: false, message: 'Title and Department are required.' });
    }

    if (!mockData.campaigns) mockData.campaigns = [];

    const newCampaign = {
        id: uuidv4(),
        title,
        description: description || '',
        department_code,
        startDate: startDate || '',
        endDate: endDate || '',
        type: type || 'Growth',
        unit: unit || 'Count',
        status: 'Active',
        image: image || '',
        overall_target: overall_target || 0,
        data: data || [],
        createdAt: new Date().toISOString()
    };

    // Auto-calculate overall_target if not provided but data exists
    if (!overall_target && data && data.length > 0) {
        newCampaign.overall_target = data.reduce((sum, item) => sum + (Number(item.target) || 0), 0);
    }

    mockData.campaigns.push(newCampaign);
    persistence.saveData(mockData);
    res.json({ success: true, campaign: newCampaign });
});

app.put('/api/campaigns/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!mockData.campaigns) mockData.campaigns = [];
    const campaign = mockData.campaigns.find(c => c.id === id);

    if (!campaign) {
        return res.status(404).json({ success: false, message: 'Campaign not found.' });
    }

    // Update allowed fields
    const allowedFields = ['title', 'description', 'startDate', 'endDate', 'type', 'unit', 'status', 'image', 'overall_target', 'data', 'achievement_entries'];
    allowedFields.forEach(field => {
        if (updates[field] !== undefined) campaign[field] = updates[field];
    });

    // Re-calculate overall_target if data changed and target not explicitly set in this update
    if (updates.data && updates.overall_target === undefined) {
        campaign.overall_target = updates.data.reduce((sum, item) => sum + (Number(item.target) || 0), 0);
    }

    persistence.saveData(mockData);
    res.json({ success: true, campaign });
});

app.delete('/api/campaigns/:id', (req, res) => {
    const { id } = req.params;
    if (!mockData.campaigns) mockData.campaigns = [];

    const index = mockData.campaigns.findIndex(c => c.id === id);
    if (index !== -1) {
        mockData.campaigns.splice(index, 1);
        persistence.saveData(mockData);
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: 'Campaign not found.' });
    }
});

// --- 8. Department Management ---
app.get('/api/departments', (req, res) => {
    res.json(mockData.departments || []);
});

app.post('/api/departments', (req, res) => {
    const { code, name, name_hindi, shortform } = req.body;

    // Validation: Code must be numeric and 4 digits
    if (!/^\d{4}$/.test(code)) {
        return res.status(400).json({ success: false, message: 'Department code must be a 4-digit number.' });
    }

    // Validation: Code must be unique
    const existing = (mockData.departments || []).find(d => d.code === code);
    if (existing) {
        return res.status(400).json({ success: false, message: 'Department code already exists.' });
    }

    const newDept = { code, name, name_hindi: name_hindi || '', shortform: shortform || '' };
    if (!mockData.departments) mockData.departments = [];

    mockData.departments.push(newDept);
    persistence.saveData(mockData);
    res.json({ success: true, department: newDept });
});

app.put('/api/departments/:code', (req, res) => {
    const { code, name, name_hindi, shortform } = req.body;
    const oldCode = req.params.code;

    if (!mockData.departments) mockData.departments = [];
    const dept = mockData.departments.find(d => d.code === oldCode);

    if (!dept) {
        return res.status(404).json({ success: false, message: 'Department not found.' });
    }

    // If code is changing
    if (code && code !== oldCode) {
        // Validate new code numeric and 4 digits
        if (!/^\d{4}$/.test(code)) {
            return res.status(400).json({ success: false, message: 'Department code must be a 4-digit number.' });
        }
        // Validate uniqueness
        const existing = mockData.departments.find(d => d.code === code);
        if (existing) {
            return res.status(400).json({ success: false, message: 'Department code already exists.' });
        }

        dept.code = code;
        // Optionally update references in other tables if needed, BUT currently users seem to store department IDs or something else? 
        // Checking user structure: "departments": [1, 2] (looks like IDs). 
        // Wait, the new requirement says "numeric code" for Department. 
        // Existing mock data has integers in user.departments. 
        // If I change the Department structure to rely on 'code', I should check if users are linked by ID or Code. 
        // The mockData `divisions` array seems to be what was used before? 
        // "divisions": [{"id": 1, "name": "Planning"}]
        // Users link to 'id'. 
        // The requirement is "Build Departments management... Each Department must have a unique numeric code".
        // It implies replacing or extending 'divisions'. 
        // I'll stick to 'departments' as a new entity for now to avoid breaking existing stuff unless explicitly asked to replace 'divisions'.
    }

    if (name) dept.name = name;
    if (shortform !== undefined) dept.shortform = shortform;

    persistence.saveData(mockData);
    res.json({ success: true, department: dept });
});

app.delete('/api/departments/:code', (req, res) => {
    const code = req.params.code;
    if (!mockData.departments) mockData.departments = [];

    const index = mockData.departments.findIndex(d => d.code === code);
    if (index !== -1) {
        mockData.departments.splice(index, 1);
        persistence.saveData(mockData);
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: 'Department not found.' });
    }
});

// --- 9. Interest Rates Management ---
app.get('/api/interest-rates', (req, res) => {
    res.json(mockData.interest_rates || []);
});

app.post('/api/interest-rates', (req, res) => {
    const rate = req.body;
    const newRate = { ...rate, id: Date.now() }; // Simple ID generation
    if (!mockData.interest_rates) mockData.interest_rates = [];

    mockData.interest_rates.push(newRate);
    persistence.saveData(mockData);
    res.json({ success: true, rate: newRate });
});

app.put('/api/interest-rates/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updates = req.body;

    const rate = mockData.interest_rates.find(r => r.id === id);
    if (rate) {
        Object.assign(rate, updates);
        persistence.saveData(mockData);
        res.json({ success: true, rate });
    } else {
        res.status(404).json({ success: false, message: 'Rate not found' });
    }
});

app.delete('/api/interest-rates/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!mockData.interest_rates) mockData.interest_rates = [];

    const index = mockData.interest_rates.findIndex(r => r.id === id);
    if (index !== -1) {
        mockData.interest_rates.splice(index, 1);
        persistence.saveData(mockData);
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: 'Rate not found' });
    }
});

// --- 10. Document Management (Notes, Letters) ---

// Helper: Generate Document Ref No
const generateDocRefNo = (type, db) => {
    const year = new Date().getFullYear();
    const prefix = 'IOB';
    // Map nice type names to short codes if needed, or just use generic NOTE/LTR
    // type example: 'office_note', 'letter' -> NOTE, LETTER
    let typeCode = 'DOC';
    if (type === 'office_note') typeCode = 'NOTE';
    else if (type === 'letter') typeCode = 'LTR';
    else if (type === 'circular') typeCode = 'CIR';

    // Find matching docs for this year/type to increment sequence
    if (!db.documents) db.documents = [];
    const pattern = `${prefix}/${typeCode}/${year}/`;

    // Filter existing docs of same pattern
    const existing = db.documents.filter(d =>
        d.refNo && d.refNo.startsWith(pattern) && !d.is_deleted
    );

    // Find max sequence
    let maxSeq = 0;
    existing.forEach(d => {
        const parts = d.refNo.split('/');
        const seq = parseInt(parts[parts.length - 1], 10);
        if (!isNaN(seq) && seq > maxSeq) maxSeq = seq;
    });

    const nextSeq = String(maxSeq + 1).padStart(3, '0');
    return `${pattern}${nextSeq}`;
};

app.get('/api/documents', (req, res) => {
    const docs = (mockData.documents || [])
        .filter(d => !d.is_deleted)
        .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
    res.json(docs);
});

app.post('/api/documents', (req, res) => {
    const { category, type, subject, content, formData, status } = req.body;

    if (!mockData.documents) mockData.documents = [];

    const refNo = generateDocRefNo(category, mockData);

    const newDoc = {
        id: uuidv4(),
        refNo,
        category, // office_note, letter
        type,     // broken_period, generic, etc
        subject,
        content,
        formData, // Save full form state to allow re-editing
        status: status || 'Draft', // Draft, Final
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        is_deleted: false
    };

    mockData.documents.push(newDoc);
    persistence.saveData(mockData);
    res.json({ success: true, document: newDoc });
});

app.put('/api/documents/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!mockData.documents) mockData.documents = [];
    const doc = mockData.documents.find(d => d.id === id);

    if (doc) {
        // Allowed updates
        if (updates.subject) doc.subject = updates.subject;
        if (updates.content) doc.content = updates.content;
        if (updates.formData) doc.formData = updates.formData;
        if (updates.status) doc.status = updates.status;

        doc.updatedAt = new Date().toISOString();

        persistence.saveData(mockData);
        res.json({ success: true, document: doc });
    } else {
        res.status(404).json({ success: false, message: 'Document not found' });
    }
});

app.delete('/api/documents/:id', (req, res) => {
    const { id } = req.params;
    if (!mockData.documents) mockData.documents = [];

    const doc = mockData.documents.find(d => d.id === id);
    if (doc) {
        doc.is_deleted = true;
        persistence.saveData(mockData);
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: 'Document not found' });
    }
});

app.get('/api/retirement-letters', (req, res) => {
    const letters = (mockData.retirement_letters || [])
        .filter(l => !l.is_deleted)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(letters);
});

// Helper for ref no
const generateRetirementRefNo = (regionCode, db) => {
    const year = new Date().getFullYear();
    const region = regionCode || 'RO';
    const prefix = `RO/${region}/HRD/RET/${year}`;

    if (!db.retirement_letters) db.retirement_letters = [];

    // Check for existing sequence usage
    const busyNums = db.retirement_letters
        .filter(l => l.refNo && l.refNo.startsWith(prefix) && !l.is_deleted)
        .map(l => {
            const parts = l.refNo.split('/');
            return parseInt(parts[parts.length - 1], 10);
        })
        .sort((a, b) => a - b);

    // Find first available number
    let nextSeq = 1;
    for (const num of busyNums) {
        if (num === nextSeq) {
            nextSeq++;
        } else {
            // Gap found, use nextSeq
            break;
        }
    }

    return `${prefix}/${String(nextSeq).padStart(3, '0')}`;
};

app.post('/api/retirement-letters', (req, res) => {
    const { name, rollNo, designation, sol, gender, joiningDate, retirementDate, documentDate, regionCode, photo } = req.body;

    if (!name || !rollNo) {
        return res.status(400).json({ success: false, message: 'Name and Roll No are required.' });
    }

    if (!mockData.retirement_letters) mockData.retirement_letters = [];

    const refNo = generateRetirementRefNo(regionCode, mockData);

    const newLetter = {
        id: uuidv4(),
        refNo,
        name,
        rollNo,
        designation,
        sol, // Store SOL
        gender,
        joiningDate,
        retirementDate,
        documentDate: documentDate || new Date().toISOString(), // Use provided date or now
        photo,
        createdAt: new Date().toISOString(),
        is_deleted: false
    };

    mockData.retirement_letters.push(newLetter);
    persistence.saveData(mockData);
    res.json({ success: true, letter: newLetter });
});

app.put('/api/retirement-letters/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!mockData.retirement_letters) mockData.retirement_letters = [];
    const letter = mockData.retirement_letters.find(l => l.id === id);

    if (letter) {
        // Update allowed fields
        const allowed = ['name', 'rollNo', 'designation', 'sol', 'gender', 'joiningDate', 'retirementDate', 'documentDate', 'photo', 'regionSnapshot', 'signatoryName', 'signatoryDesignation', 'signatoryRegion'];
        allowed.forEach(field => {
            if (updates[field] !== undefined) letter[field] = updates[field];
        });

        persistence.saveData(mockData);
        res.json({ success: true, letter });
    } else {
        res.status(404).json({ success: false, message: 'Letter not found' });
    }
});

app.delete('/api/retirement-letters/:id', (req, res) => {
    const { id } = req.params;
    if (!mockData.retirement_letters) mockData.retirement_letters = [];

    const letter = mockData.retirement_letters.find(l => l.id === id);
    if (letter) {
        letter.is_deleted = true;
        persistence.saveData(mockData);
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: 'Letter not found.' });
    }
});

// --- 11. PMS (Scorecard) Mock Endpoint ---
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

// Helper to normalize keys
const normalizeKey = (key) => String(key).toLowerCase().replace(/[^a-z0-9]/g, '');

// Main Processing Function
const processFolder = (folderName, dataKey, metaKey, db) => {
    const dir = path.join(__dirname, '..', 'data', folderName);
    if (!fs.existsSync(dir)) {
        console.log(`Directory not found: ${dir}`);
        if (!db[dataKey]) db[dataKey] = [];
        return { count: 0 };
    }

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.xlsx') || f.endsWith('.xls') || f.endsWith('.csv'));
    let allData = [];
    const fileNames = [];

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        fileNames.push(file);

        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        let jsonData = xlsx.utils.sheet_to_json(sheet, { defval: "" });

        // Add source file info to each row
        jsonData = jsonData.map(row => ({
            ...row,
            'Source File': file,
            'Import Date': new Date().toISOString()
        }));

        allData = allData.concat(jsonData);
    });

    // Update DB
    db[dataKey] = allData;
    db[metaKey] = {
        lastSync: new Date().toISOString(),
        sourceFile: `${files.length} Files (${fileNames[0] || ''} - ${fileNames[fileNames.length - 1] || ''})`,
        count: allData.length
    };

    return { count: allData.length };
};

app.post('/api/pms/downgraded/sync', (req, res) => {
    const dirPath = path.join(__dirname, '../data/downgraded');
    try {
        const downStats = processFolder('downgraded', 'downgraded_accounts', 'downgraded_meta', mockData);
        const upStats = processFolder('upgraded', 'upgraded_accounts', 'upgraded_meta', mockData);

        persistence.saveData(mockData);

        res.json({
            success: true,
            message: `Synced. Downgraded: ${downStats.count} recs. Upgraded: ${upStats.count} recs.`,
            stats: mockData.downgraded_meta,
            upgradedStats: mockData.upgraded_meta
        });

    } catch (error) {
        console.error("Sync Error:", error);
        res.status(500).json({ success: false, message: 'Sync failed', error: error.message });
    }
});

app.get('/api/pms/downgraded', (req, res) => {
    // Return stored data if available
    res.json({
        success: true,
        data: mockData.downgraded_accounts || [],
        meta: mockData.downgraded_meta || {},
        upgradedData: mockData.upgraded_accounts || [],
        upgradedMeta: mockData.upgraded_meta || {}
    });
});

// --- PMS New Provisions Endpoints ---
const definePMSEndpoint = (endpoint, folderName, dataKey, metaKey) => {
    app.post(`/api/pms/${endpoint}/sync`, (req, res) => {
        const dirPath = path.join(__dirname, `../data/${folderName}`);
        try {
            const stats = processFolder(folderName, dataKey, metaKey, mockData);
            persistence.saveData(mockData);
            res.json({
                success: true,
                message: `Synced ${folderName}. Records: ${stats.count}`,
                stats: mockData[metaKey]
            });
        } catch (error) {
            console.error(`Sync Error (${folderName}):`, error);
            res.status(500).json({ success: false, message: 'Sync failed', error: error.message });
        }
    });

    app.get(`/api/pms/${endpoint}`, (req, res) => {
        res.json({
            success: true,
            data: mockData[dataKey] || [],
            meta: mockData[metaKey] || {}
        });
    });
};

definePMSEndpoint('key-params', 'key_params', 'key_params', 'key_params_meta');
definePMSEndpoint('core-agri', 'core_agri', 'core_agri', 'core_agri_meta');
definePMSEndpoint('bulk-deposit', 'bulk_deposit', 'bulk_deposit', 'bulk_deposit_meta');
definePMSEndpoint('cash', 'cash', 'cash_data', 'cash_meta');
definePMSEndpoint('recovery', 'recovery', 'recovery', 'recovery_meta');
definePMSEndpoint('ots', 'ots', 'ots', 'ots_meta');

// Explicit Sanctions Handler (Must be before generic)
app.get('/api/branches', (req, res) => {
    res.json(mockData.orgMaster || []);
});

app.post('/api/pms/sanctions/sync', (req, res) => {
    try {
        const stats = processFolder('sanctions', 'sanctions', 'sanctions_meta', mockData);
        persistence.saveData(mockData);
        logDebug(`Synced sanctions. Count: ${stats.count}`);
        res.json({
            success: true,
            message: `Synced sanctions. Records: ${stats.count}`,
            stats: mockData.sanctions_meta
        });
    } catch (error) {
        console.error(`Sync Error (sanctions):`, error);
        res.status(500).json({ success: false, message: 'Sync failed', error: error.message });
    }
});

// Explicit Sanctions Handler (Must be before generic)
app.get('/api/pms/sanctions', (req, res) => {
    const dataSize = mockData.sanctions ? mockData.sanctions.length : 0;
    logDebug(`GET Sanctions: Serving ${dataSize} records.`);
    res.json({
        success: true,
        data: mockData.sanctions || [],
        meta: mockData.sanctions_meta || {}
    });
});

app.get('/api/pms/:divisionId', (req, res, next) => {
    const { divisionId } = req.params;
    const specialRoutes = ['sanctions', 'downgraded', 'upgraded', 'key-params', 'core-agri', 'bulk-deposit', 'cash'];
    if (specialRoutes.includes(divisionId)) return next();
    // Generate random mock data
    const score = Math.floor(Math.random() * (95 - 70) + 70);

    // Customize based on division if needed, for now generic
    const data = {
        divisionId,
        score: score,
        kpis: [
            { name: 'Target Achievement', value: `${Math.floor(Math.random() * 20 + 80)}%` },
            { name: 'Customer Satisfaction', value: `${(Math.random() * 1 + 4).toFixed(1)}/5` },
            { name: 'SLA Compliance', value: `${Math.floor(Math.random() * 10 + 90)}%` },
            { name: 'Audit Score', value: 'A+' }
        ]
    };

    // Simulate slight delay
    setTimeout(() => res.json(data), 300);
});

const csv = require('csv-parser');

// Sanctions Data Sync API
// Sanctions Data Sync API (POST)
app.post('/api/pms/sanctions/sync', (req, res) => {
    const dataDir = 'c:\\Users\\Acer\\Videos\\iobian_v1\\iobian\\data\\verticals';

    // Find the latest CSV file
    fs.readdir(dataDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).json({ success: false, message: 'Failed to access data directory.' });
        }

        const csvFiles = files.filter(file => file.endsWith('.csv'));
        if (csvFiles.length === 0) {
            return res.status(404).json({ success: false, message: 'No data files found.' });
        }

        // Read ALL files
        const readCsvFile = (filename) => {
            return new Promise((resolve, reject) => {
                const results = [];
                const filepath = path.join(dataDir, filename);
                fs.createReadStream(filepath)
                    .pipe(csv())
                    .on('data', (data) => {
                        // Mapping Logic
                        const priorityRaw = (data['PRIORITY_TYPE'] || '').toUpperCase();
                        const type = (priorityRaw === 'SME' || priorityRaw === 'SME_NP') ? 'MSME' : priorityRaw;

                        // Parse Date (YYYYMMDD to ISO)
                        let openDate = data['OPEN_DT'];
                        if (openDate && openDate.length === 8) {
                            openDate = `${openDate.slice(0, 4)}-${openDate.slice(4, 6)}-${openDate.slice(6, 8)}`;
                        }

                        results.push({
                            sol: data['SOL_ID'] || data['SOL'] || data['BRANCH_CODE'] || data['Branch Code'],
                            type: type,
                            schemeCode: data['SCHM_CODE'],
                            glSubHeadCode: data['GL_SUB_CD'],
                            openDate: openDate,
                            sanctionLimit: parseFloat(data['DOC_AMOUNT'] || 0),
                            balance: Math.abs(parseFloat(data['NET_BALANCE '] || data['NET_BALANCE'] || 0)),
                            cif: data['CUSTOMER_ID'],
                            'Source File': filename,
                            'Import Date': new Date().toISOString()
                        });
                    })
                    .on('end', () => resolve(results))
                    .on('error', (err) => reject(err));
            });
        };

        Promise.all(csvFiles.map(file => readCsvFile(file)))
            .then(allData => {
                const flatData = allData.flat();

                // Update Persistence
                mockData.sanctions = flatData;
                mockData.sanctions_meta = {
                    fileName: `${csvFiles.length} Files (${csvFiles[0]} - ${csvFiles[csvFiles.length - 1]})`,
                    lastSyncTime: new Date().toISOString(),
                    recordCount: flatData.length
                };
                persistence.saveData(mockData);

                logToFile(`Sanctions Sync: Processed ${csvFiles.length} files. Total Records: ${flatData.length}`);

                res.json({
                    success: true,
                    data: flatData,
                    meta: mockData.sanctions_meta
                });
            })
            .catch(err => {
                console.error('Error parsing CSVs:', err);
                res.status(500).json({ success: false, message: 'Error parsing one or more data files.' });
            });
    });
});

// GET Sanctions Data
app.get('/api/pms/sanctions', (req, res) => {
    const dataSize = mockData.sanctions ? mockData.sanctions.length : 0;
    logDebug(`GET Sanctions: Serving ${dataSize} records.`);
    res.json({
        success: true,
        data: mockData.sanctions || [],
        meta: mockData.sanctions_meta || {}
    });
});
// Legacy GET Sync redirection (optional, but let's just use POST)

// Scorecard Export Endpoint
app.post('/api/pms/scorecard/export', (req, res) => {
    try {
        const { data, date } = req.body;
        if (!data || !date) return res.status(400).json({ success: false, message: 'Data and Date are required.' });

        const historyDir = path.join(__dirname, '../data/scorecard_history');
        if (!fs.existsSync(historyDir)) {
            fs.mkdirSync(historyDir, { recursive: true });
        }

        const fileName = `scorecard_${date}.json`;
        const filePath = path.join(historyDir, fileName);

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        res.json({ success: true, message: `Scorecard exported successfully to ${fileName}` });
    } catch (error) {
        console.error('Export Error:', error);
        res.status(500).json({ success: false, message: 'Export failed', error: error.message });
    }
});

// --- 12. Generic Region Endpoints ---

// Generic Region Stats Endpoint
app.get('/api/public/region/:code/stats', (req, res) => {
    try {
        const regionCode = req.params.code;
        const region = mockData.regions.find(r => String(r.region_code) === String(regionCode));

        if (!region) {
            return res.status(404).json({ success: false, message: 'Region not found' });
        }

        // Branch Count
        const branches = mockData.orgMaster.filter(b => String(b.region_code) === String(regionCode) && !b.is_deleted);
        const branchCount = branches.length;

        // Staff Strength
        const branchCodes = branches.map(b => b.branch_code);
        const staff = mockData.users.filter(u =>
            !u.is_deleted &&
            (String(u.linked_region_code) === String(regionCode) || branchCodes.includes(u.linked_branch_code))
        );
        const staffStrength = staff.length;

        // Total Business (aggregate from all branches)
        let totalBusiness = 0;

        if (mockData.key_params && mockData.key_params.length > 0) {
            const regionRows = mockData.key_params.filter(row => {
                const regionName = row['Region Name'] || row['REGION NAME'] || '';
                return regionName.toLowerCase().includes(region.region_name.toLowerCase());
            });

            if (regionRows.length > 0) {
                totalBusiness = regionRows.reduce((sum, row) => {
                    const business = parseFloat(row['Business'] || row['BUSINESS'] || 0);
                    return sum + business;
                }, 0);

                if (!totalBusiness) {
                    totalBusiness = regionRows.reduce((sum, row) => {
                        const deposits = parseFloat(row['Deposits'] || row['DEPOSITS'] || 0);
                        const advances = parseFloat(row['Advances'] || row['ADVANCES'] || 0);
                        return sum + deposits + advances;
                    }, 0);
                }
            }
        }

        res.json({
            success: true,
            regionName: region.region_name,
            regionCode: region.region_code,
            stats: {
                totalBusiness: totalBusiness,
                branchCount: branchCount,
                staffStrength: staffStrength,
                nextReview: "Jan 10, '26"
            }
        });

    } catch (error) {
        console.error("Stats Error:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch stats' });
    }
});

// Generic Region Organization Endpoint
app.get('/api/public/region/:code/org', (req, res) => {
    try {
        const regionCode = req.params.code;
        const region = mockData.regions.find(r => String(r.region_code) === String(regionCode));

        if (!region) {
            return res.status(404).json({ success: false, message: 'Region not found' });
        }

        // Hierarchy Order Map
        const designationOrder = {
            'General Manager': 1,
            'Chief Regional Manager': 2,
            'Senior Regional Manager': 3,
            'Assistant General Manager': 4,
            'Chief Manager': 5,
            'Senior Manager': 6,
            'Manager': 7,
            'Assistant Manager': 8,
            'Officer': 9,
            'Customer Service Associate': 10,
            'Clerk': 10,
            'Messenger': 11,
            'Sub-staff': 11
        };

        const getRank = (title) => designationOrder[title] || 100;

        const sortStaff = (list) => {
            return list.sort((a, b) => getRank(a.designation) - getRank(b.designation));
        };

        // 1. Get RO Staff
        let roStaff = mockData.users.filter(u =>
            !u.is_deleted &&
            String(u.linked_region_code) === String(regionCode) &&
            u.office_level === 'RO'
        );

        const head = roStaff.find(u => u.is_head);
        const team = sortStaff(roStaff.filter(u => !u.is_head));

        // 2. Get Branches for this Region
        const branches = mockData.orgMaster.filter(b =>
            String(b.region_code) === String(regionCode) &&
            !b.is_deleted
        );

        // 3. Get Staff for these Branches
        const branchCodes = branches.map(b => b.branch_code);
        const allBranchStaff = mockData.users.filter(u =>
            !u.is_deleted &&
            u.office_level !== 'RO' &&
            (branchCodes.includes(u.linked_branch_code) || String(u.linked_region_code) === String(regionCode))
        );

        const formatUser = (u, officeName) => {
            // Map all department codes to names
            let departments = [];
            let departmentCodes = [];
            if (u.departments && u.departments.length > 0) {
                departments = u.departments
                    .map(deptCode => {
                        const dept = mockData.departments ? mockData.departments.find(d => String(d.code) === String(deptCode)) : null;
                        if (dept) {
                            departmentCodes.push(String(deptCode));
                            return dept.name;
                        }
                        return null;
                    })
                    .filter(name => name !== null);
            }

            // Determine if user is a department head (Chief Manager or higher rank)
            const headDesignations = ['Chief Manager', 'Senior Manager', 'Assistant General Manager',
                'Senior Regional Manager', 'Chief Regional Manager', 'General Manager'];
            const isDepartmentHead = departments.length > 0 && headDesignations.includes(u.designation);

            return {
                full_name: u.full_name,
                designation: u.designation,
                departments: departments, // Array of department names
                department_codes: departmentCodes, // Array of department codes
                is_department_head: isDepartmentHead,
                is_second_line_officer: u.is_second_line_officer || false,
                photo: u.photo_url || null,
                office: officeName || 'Branch Office',
                mobile: u.mobile || 'N/A',
                email: u.email || null,
                branch_code: u.linked_branch_code || null,
                region_code: u.linked_region_code || null,
                rank: getRank(u.designation),
                is_head: u.is_head
            };
        };

        // 4. Structure Data: Group Staff by Branch
        const branchHierarchy = branches.map(branch => {
            const staff = allBranchStaff.filter(u => u.linked_branch_code === branch.branch_code);
            const branchHead = staff.find(u => u.is_head);
            const branchTeam = sortStaff(staff.filter(u => !u.is_head));

            return {
                branch_code: branch.branch_code,
                branch_name: branch.branch_name,
                latitude: branch.latitude,
                longitude: branch.longitude,
                district: branch.district,
                type: branch.type,
                category: branch.category,
                head: branchHead ? formatUser(branchHead, branch.branch_name) : null,
                team: branchTeam.map(u => formatUser(u, branch.branch_name))
            };
        }).sort((a, b) => a.branch_name.localeCompare(b.branch_name));

        res.json({
            success: true,
            regionName: region.region_name,
            regionCode: region.region_code,
            head: head ? formatUser(head, 'Regional Office') : null,
            team: team.map(u => formatUser(u, 'Regional Office')),
            branches: branchHierarchy
        });

    } catch (error) {
        console.error("Org Fetch Error:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch organization structure' });
    }
});

// --- 12a. Public Region Stats (Dindigul - Legacy) ---
app.get('/api/public/dindigul-stats', (req, res) => {
    try {
        // 1. Identify Dindigul Region (Strict Code 3933)
        const regionCode = '3933';
        const region = mockData.regions.find(r => r.region_code == regionCode);

        // 2. Branch Count
        const branches = mockData.orgMaster.filter(b => String(b.region_code) === String(regionCode) && !b.is_deleted);
        const branchCount = branches.length;

        // 3. Staff Strength
        // Staff at RO (linked_region_code) + Staff at Branches (linked_branch_code in Dindigul branches)
        const branchCodes = branches.map(b => b.branch_code);
        const staff = mockData.users.filter(u =>
            !u.is_deleted &&
            (u.linked_region_code === regionCode || branchCodes.includes(u.linked_branch_code))
        );
        const staffStrength = staff.length;

        // 4. Total Business (From key_params data)
        // key_params structure: { "Region Name": "Dindigul", "Deposits": 125.879, "Advances": 50.123, "Business": 175.002, ... }
        // Values are in Crores
        let totalBusiness = 0;

        if (mockData.key_params && mockData.key_params.length > 0) {
            // Find ALL Dindigul region rows (one per branch)
            const dindigulRows = mockData.key_params.filter(row => {
                const regionName = row['Region Name'] || row['REGION NAME'] || '';
                return regionName.toLowerCase().includes('dindigul');
            });

            if (dindigulRows.length > 0) {
                // Sum business values from all branches
                totalBusiness = dindigulRows.reduce((sum, row) => {
                    const business = parseFloat(row['Business'] || row['BUSINESS'] || 0);
                    return sum + business;
                }, 0);

                // If Business field is missing, calculate from components
                if (!totalBusiness) {
                    totalBusiness = dindigulRows.reduce((sum, row) => {
                        const deposits = parseFloat(row['Deposits'] || row['DEPOSITS'] || 0);
                        const advances = parseFloat(row['Advances'] || row['ADVANCES'] || 0);
                        return sum + deposits + advances;
                    }, 0);
                }
            }
        }

        res.json({
            success: true,
            regionName: region ? region.region_name : 'Dindigul Region',
            stats: {
                totalBusiness: totalBusiness, // Raw number
                branchCount: branchCount,
                staffStrength: staffStrength,
                nextReview: "Jan 10, '26" // Static for now
            }
        });

    } catch (error) {
        console.error("Stats Error:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch stats' });
    }
});

// --- 13. Organization Structure & Uploads ---

// Configure Multer for Staff Photos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../client/public/uploads/staff');
        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Use timestamp to prevent caching issues, keep original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'staff-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Upload Endpoint
app.post('/api/upload', upload.single('photo'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        // Return path relative to public folder for frontend access
        const publicPath = `/uploads/staff/${req.file.filename}`;
        res.json({ success: true, url: publicPath });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ success: false, message: 'Upload failed' });
    }
});

// Organization Structure Endpoint
app.get('/api/public/dindigul-org', (req, res) => {
    try {
        // Strictly use Region Code 3933 as per requirement
        const dindigulCode = '3933';


        // Hierarchy Order Map
        const designationOrder = {
            'General Manager': 1,
            'Chief Regional Manager': 2,
            'Senior Regional Manager': 3,
            'Assistant General Manager': 4,
            'Chief Manager': 5,
            'Senior Manager': 6,
            'Manager': 7,
            'Assistant Manager': 8,
            'Officer': 9,
            'Customer Service Associate': 10,
            'Clerk': 10,
            'Messenger': 11,
            'Sub-staff': 11
        };

        const getRank = (title) => designationOrder[title] || 100; // Default to lowest priority

        const sortStaff = (list) => {
            return list.sort((a, b) => getRank(a.designation) - getRank(b.designation));
        };

        // 1. Get RO Staff
        let roStaff = mockData.users.filter(u =>
            !u.is_deleted &&
            String(u.linked_region_code) === String(dindigulCode) &&
            u.office_level === 'RO'
        );

        const head = roStaff.find(u => u.is_head);
        // Fix: Sort the RO team by designation
        const team = sortStaff(roStaff.filter(u => !u.is_head));

        // 2. Get Branches for this Region
        const branches = (mockData.orgMaster || []).filter(b =>
            String(b.region_code) === String(dindigulCode) &&
            !b.is_deleted
        );

        // 3. Get Staff for these Branches
        // Filter users who are NOT RO level (Branch level) and linked to one of the branches
        const branchCodes = branches.map(b => b.branch_code);
        const allBranchStaff = mockData.users.filter(u =>
            !u.is_deleted &&
            u.office_level !== 'RO' &&
            (branchCodes.includes(u.linked_branch_code) || String(u.linked_region_code) === String(dindigulCode))
        );

        const formatUser = (u, officeName) => {
            // Map department code to name
            let departmentName = null;
            if (u.departments && u.departments.length > 0) {
                const deptCode = String(u.departments[0]);
                const dept = mockData.departments.find(d => String(d.code) === deptCode);
                departmentName = dept ? dept.name : null;
            }

            return {
                full_name: u.full_name,
                designation: u.designation,
                department: departmentName,
                photo: u.photo_url || null,
                office: officeName || 'Branch Office',
                mobile: u.mobile || 'N/A',
                is_head: u.is_head
            };
        };



        // 4. Structure Data: Group Staff by Branch
        const branchHierarchy = branches.map(branch => {
            const staff = allBranchStaff.filter(u => u.linked_branch_code === branch.branch_code);
            const branchHead = staff.find(u => u.is_head); // Assuming is_head might be used for Branch Heads too
            const branchTeam = sortStaff(staff.filter(u => !u.is_head));

            return {
                branch_code: branch.branch_code,
                branch_name: branch.branch_name,
                head: branchHead ? formatUser(branchHead, branch.branch_name) : null,
                team: branchTeam.map(u => formatUser(u, branch.branch_name))
            };
        }).sort((a, b) => a.branch_name.localeCompare(b.branch_name)); // Sort branches alphabetically

        res.json({
            success: true,
            head: head ? formatUser(head, 'Regional Office') : null,
            team: team.map(u => formatUser(u, 'Regional Office')),
            branches: branchHierarchy
        });

    } catch (error) {
        console.error("Org Fetch Error:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch organization structure' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
