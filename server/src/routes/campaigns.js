const express = require('express');
const router = express.Router();
const persistence = require('../persistence');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
    const mockData = persistence.loadData();
    res.json(mockData.campaigns || []);
});

router.post('/', (req, res) => {
    const mockData = persistence.loadData();
    const newCampaign = { ...req.body, id: uuidv4(), status: 'Active', createdAt: new Date().toISOString() };
    mockData.campaigns.push(newCampaign);
    persistence.saveData(mockData);
    res.json({ success: true, campaign: newCampaign });
});

// ... PUT /:id, DELETE /:id

module.exports = router;
