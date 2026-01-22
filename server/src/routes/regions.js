const express = require('express');
const router = express.Router();
const persistence = require('../persistence');

router.get('/', (req, res) => {
    const mockData = persistence.loadData();
    const regionsWithStates = mockData.regions.map(r => {
        const branches = mockData.orgMaster.filter(b => b.region_code === r.region_code && !b.is_deleted);
        const states = [...new Set(branches.map(b => b.state).filter(Boolean))];
        return { ...r, states_covered: states };
    });
    res.json(regionsWithStates);
});

router.post('/', (req, res) => {
    const mockData = persistence.loadData();
    const { region_code, region_name } = req.body;
    if (mockData.regions.find(r => r.region_code === region_code)) {
        return res.status(400).json({ success: false, message: 'Region Exists' });
    }
    const newRegion = { ...req.body, head_office_code: 'CO', is_deleted: false };
    mockData.regions.push(newRegion);
    persistence.saveData(mockData);
    res.json({ success: true, region: newRegion });
});

// ... PUT /:code (Cascade update), DELETE /:code

module.exports = router;
