const express = require('express');
const router = express.Router();
const persistence = require('../persistence');

router.get('/region/:code/stats', (req, res) => {
    const mockData = persistence.loadData();
    const regionCode = req.params.code;
    const region = mockData.regions.find(r => String(r.region_code) === String(regionCode));
    if (!region) return res.status(404).json({ success: false, message: 'Region not found' });

    const branches = mockData.orgMaster.filter(b => String(b.region_code) === String(regionCode) && !b.is_deleted);
    const branchCodes = branches.map(b => b.branch_code);
    const staff = mockData.users.filter(u => !u.is_deleted && (String(u.linked_region_code) === String(regionCode) || branchCodes.includes(u.linked_branch_code)));

    res.json({
        success: true,
        regionName: region.region_name,
        stats: { branchCount: branches.length, staffStrength: staff.length }
    });
});

module.exports = router;
