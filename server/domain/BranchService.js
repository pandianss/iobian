const branchRepository = require('../persistence/BranchRepository');

class BranchService {
    async getAllBranches() {
        return await branchRepository.getAllActive();
    }

    async createBranch(branchData) {
        // Validation
        if (!branchData.branch_code) {
            throw new Error('Missing Branch Code');
        }

        const existing = await branchRepository.findByCode(branchData.branch_code);
        if (existing) {
            throw new Error('Branch Exists');
        }

        const newBranch = {
            ...branchData,
            is_deleted: false,
            // Defaults
            type: branchData.type || 'Branch'
        };

        return await branchRepository.create(newBranch);
    }

    async deleteBranch(branchCode) {
        const branch = await branchRepository.findByCode(branchCode);
        if (!branch) {
            throw new Error('Branch not found');
        }
        return await branchRepository.softDelete(branchCode);
    }
}

module.exports = new BranchService();
