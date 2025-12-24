const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const persistence = require('./persistence');

// Load initial data
let mockData = persistence.loadData();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Middleware to save data after specific methods? 
// No, explicit save is better control.

// --- 2. Enhanced Authentication ---
// Helper to enhance user with region info
const enhanceUser = (user) => {
    let regionName = '';
    if (user.role === 'RO' && user.linked_region_code) {
        const region = mockData.regions.find(r => r.region_code === user.linked_region_code);
        if (region) regionName = region.region_name.replace(' Region', '');
    } else if (user.role === 'Branch' && user.linked_branch_code) {
        const branch = mockData.orgMaster.find(b => b.branch_code === user.linked_branch_code);
        if (branch) {
            const region = mockData.regions.find(r => r.region_code === branch.region_code);
            if (region) regionName = region.region_name.replace(' Region', '');
        }
    }
    return { ...user, region_name: regionName };
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
                region_name: enhanced.region_name // Explicitly sending this
            }
        });
    } else {
        res.status(404).json({ success: false, message: 'User not found in database.' });
    }
});

app.post('/api/login', (req, res) => {
    const { roll_number, password } = req.body;
    const user = mockData.users.find(u => u.roll_number === roll_number && !u.is_deleted);
    if (user) {
        res.json({ success: true, user: enhanceUser(user) });
    } else {
        res.status(401).json({ success: false, message: 'Authentication failed' });
    }
});

app.get('/api/config', (req, res) => {
    res.json(mockData.systemConfig);
});

// --- 3. Staff Management ---
app.get('/api/staff', (req, res) => {
    res.json(mockData.users.filter(u => !u.is_deleted));
});

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
        is_deleted: false,
        password_hash: 'default123'
    };
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

app.delete('/api/regions/:code', (req, res) => {
    const region = mockData.regions.find(r => r.region_code === req.params.code);
    if (region) {
        region.is_deleted = true;
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
