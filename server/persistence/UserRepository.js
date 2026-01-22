const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserRepository {
    async findByRollNumber(rollNumber) {
        return await prisma.user.findUnique({
            where: { roll_number: rollNumber }
        });
    }

    async findActiveByRollNumber(rollNumber) {
        return await prisma.user.findFirst({
            where: {
                roll_number: rollNumber,
                is_deleted: false
            }
        });
    }

    async getAllActive() {
        return await prisma.user.findMany({
            where: { is_deleted: false }
        });
    }

    async create(userData) {
        return await prisma.user.create({
            data: userData
        });
    }

    async update(rollNumber, updates) {
        return await prisma.user.update({
            where: { roll_number: rollNumber },
            data: updates
        });
    }

    async softDelete(rollNumber) {
        return await prisma.user.update({
            where: { roll_number: rollNumber },
            data: { is_deleted: true }
        });
    }

    async restore(rollNumber) {
        return await prisma.user.update({
            where: { roll_number: rollNumber },
            data: { is_deleted: false }
        });
    }
    async findHeadByContext(officeLevel, branchCode, regionCode) {
        const where = {
            is_head: true,
            is_deleted: false,
            office_level: officeLevel
        };

        if (officeLevel === 'Branch') {
            where.linked_branch_code = branchCode;
        } else if (officeLevel === 'RO') {
            where.linked_region_code = regionCode;
        }

        return await prisma.user.findFirst({ where });
    }
}

module.exports = new UserRepository();
