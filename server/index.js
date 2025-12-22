const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mockData = require('./mockData');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// --- 2. Enhanced Authentication ---
app.post('/api/auth/validate', (req, res) => {
    const { roll_number } = req.body;
    const user = mockData.users.find(u => u.roll_number === roll_number && !u.is_deleted);
    if (user) {
        res.json({ success: true, user: { roll_number: user.roll_number, full_name: user.full_name, designation: user.designation, office_level: user.office_level } });
    } else {
        res.status(404).json({ success: false, message: 'User not found in database.' });
    }
});

app.post('/api/login', (req, res) => {
    const { roll_number, password } = req.body;
    const user = mockData.users.find(u => u.roll_number === roll_number && !u.is_deleted);
    if (user) {
        res.json({ success: true, user });
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
    const { roll_number, full_name, full_name_hindi, mobile, designation, designation_hindi, office_level, role, departments } = req.body;
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
        is_deleted: false,
        password_hash: 'default123'
    };
    mockData.users.push(newUser);
    res.json({ success: true, user: newUser });
});

app.delete('/api/staff/:rollNumber', (req, res) => {
    const user = mockData.users.find(u => u.roll_number === req.params.rollNumber);
    if (user) {
        user.is_deleted = true;
        res.json({ success: true });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.get('/api/admin/restore', (req, res) => {
    const deletedUsers = mockData.users.filter(u => u.is_deleted);
    res.json({ users: deletedUsers });
});

app.post('/api/admin/restore', (req, res) => {
    const { type, id } = req.body;
    if (type === 'user') {
        const user = mockData.users.find(u => u.roll_number === id);
        if (user) {
            user.is_deleted = false;
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
    res.json({ success: true, region: newRegion });
});

app.put('/api/regions/:code', (req, res) => {
    const { region_name, region_name_hindi } = req.body;
    const region = mockData.regions.find(r => r.region_code === req.params.code);
    if (region) {
        if (region_name) region.region_name = region_name;
        if (region_name_hindi) region.region_name_hindi = region_name_hindi;
        res.json({ success: true, region });
    } else {
        res.status(404).json({ success: false, message: 'Region not found' });
    }
});

app.delete('/api/regions/:code', (req, res) => {
    const region = mockData.regions.find(r => r.region_code === req.params.code);
    if (region) {
        region.is_deleted = true;
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: 'Region not found' });
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
        latitude, longitude, pincode, category, type
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
        latitude, longitude, pincode, category, type: type || 'Branch',
        is_deleted: false
    };
    mockData.orgMaster.push(newBranch);
    res.json({ success: true, branch: newBranch });
});

app.delete('/api/branches/:code', (req, res) => {
    console.log('DELETE request for branch:', req.params.code);
    const branch = mockData.orgMaster.find(b => b.branch_code === req.params.code);
    if (branch) {
        branch.is_deleted = true;
        console.log('Branch deleted:', branch.branch_code);
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
        res.json({ success: true, branch });
    } else {
        res.status(404).json({ success: false, message: 'Branch not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
