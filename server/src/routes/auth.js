const express = require('express');
const router = express.Router();
const userRepository = require('../../persistence/UserRepository');
const branchRepository = require('../../persistence/BranchRepository');
// const regionRepository = require('../../persistence/RegionRepository');

// Helper to enhance user with region info - ported to use Repositories ideally,
// but for now we will query essential info or do it on-demand.
// In the new architecture, we should rely on JOINs or separate fetches in Service.
// For this quick refactor, we'll keep it simple: just fetch User.
// The frontend expects: { roll_number, full_name, designation, office_level, region_name, branch_name, etc }

// NOTE: The legacy enhanceUser logic fetched "Region Name" by looking up Region/Branch codes.
// We need to support that.

async function enhanceUser(user) {
    let regionName = '';
    let branchName = '';

    // Branch Lookup
    if (user.linked_branch_code) {
        const branch = await branchRepository.findByCode(user.linked_branch_code);
        if (branch) {
            branchName = branch.branch_name;
            // If branch has region_code, maybe fetch that too if user doesn't have it direct?
        }
    }

    // Region Lookup
    // We haven't implemented RegionRepository yet in this session, so skipping deep region details for now
    // or we can assume linked_region_code is sufficient for basic logic.
    // If critical, we should add RegionRepository.

    return {
        ...user,
        branch_name: branchName,
        region_name: user.linked_region_code ? `Region ${user.linked_region_code}` : ''
    };
}

router.post('/login', async (req, res) => {
    try {
        const { roll_number, password } = req.body;
        const user = await userRepository.findActiveByRollNumber(roll_number);

        if (user) {
            if (user.password_hash !== password) {
                return res.status(401).json({ success: false, message: 'Invalid Credentials' });
            }

            const enhanced = await enhanceUser(user);

            res.json({
                success: true,
                user: {
                    ...enhanced,
                    must_change_password: user.must_change_password || false
                }
            });
        } else {
            // Check if user exists but is deleted? The 'findActiveByRollNumber' handles is_deleted=false.
            res.status(401).json({ success: false, message: 'Authentication failed' });
        }
    } catch (e) {
        console.error('Login Error:', e);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

router.post('/validate', async (req, res) => {
    try {
        const { roll_number } = req.body;
        const user = await userRepository.findActiveByRollNumber(roll_number);

        if (user) {
            const enhanced = await enhanceUser(user);
            res.json({
                success: true,
                user: {
                    roll_number: user.roll_number,
                    full_name: user.full_name,
                    designation: user.designation,
                    office_level: user.office_level,
                    region_name: enhanced.region_name,
                    branch_name: enhanced.branch_name,
                    // region_details: ... 
                }
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found in database.' });
        }
    } catch (e) {
        console.error('Validate Error:', e);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
