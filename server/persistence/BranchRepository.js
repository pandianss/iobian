const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class BranchRepository {
    async getAllActive() {
        return await prisma.branch.findMany({
            where: { is_deleted: false }
        });
    }

    async findByCode(branchCode) {
        return await prisma.branch.findUnique({
            where: { branch_code: branchCode }
        });
    }

    async create(branchData) {
        return await prisma.branch.create({
            data: branchData
        });
    }

    async update(branchCode, updates) {
        return await prisma.branch.update({
            where: { branch_code: branchCode },
            data: updates
        });
    }

    async softDelete(branchCode) {
        return await prisma.branch.update({
            where: { branch_code: branchCode },
            data: { is_deleted: true }
        });
    }
}

module.exports = new BranchRepository();
