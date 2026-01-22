const express = require('express');
const router = express.Router();
const branchService = require('../../domain/BranchService');

// GET /api/branches
router.get('/', async (req, res) => {
    try {
        const branches = await branchService.getAllBranches();
        res.json(branches);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST /api/branches
router.post('/', async (req, res) => {
    try {
        const newBranch = await branchService.createBranch(req.body);
        res.json({ success: true, branch: newBranch });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, message: err.message });
    }
});

// DELETE /api/branches/:code
router.delete('/:code', async (req, res) => {
    try {
        await branchService.deleteBranch(req.params.code);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        if (err.message === 'Branch not found') {
            res.status(404).json({ success: false, message: 'Branch not found' });
        } else {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
});

module.exports = router;
