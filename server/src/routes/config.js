const express = require('express');
const router = express.Router();
const persistence = require('../persistence');

router.get('/interest-rates', (req, res) => {
    const mockData = persistence.loadData();
    res.json(mockData.interest_rates || []);
});

router.get('/bank-name', (req, res) => {
    const mockData = persistence.loadData();
    res.json(mockData.bank_config || {});
});

router.put('/bank-name', (req, res) => {
    const mockData = persistence.loadData();
    mockData.bank_config = { ...mockData.bank_config, ...req.body };
    persistence.saveData(mockData);
    res.json({ success: true, data: mockData.bank_config });
});

module.exports = router;
