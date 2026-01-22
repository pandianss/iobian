const express = require('express');
const router = express.Router();
const staffService = require('../../domain/StaffService');

// GET /api/staff
router.get('/', async (req, res) => {
    try {
        const staff = await staffService.getAllStaff();
        res.json(staff);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST /api/staff
router.post('/', async (req, res) => {
    try {
        const newUser = await staffService.createStaff(req.body);
        res.json({ success: true, user: newUser });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
