const userRepository = require('../persistence/UserRepository');
const branchRepository = require('../persistence/BranchRepository');
// const regionRepository = require('../persistence/RegionRepository'); // Future

class StaffService {

    /**
     * Retrieves all active staff members.
     */
    async getAllStaff() {
        return await userRepository.getAllActive();
    }

    /**
     * Creates a new staff member with conflict checks.
     */
    async createStaff(staffData) {
        // 1. Check if user exists
        const existing = await userRepository.findByRollNumber(staffData.roll_number);
        if (existing) {
            if (existing.is_deleted) {
                throw new Error('User exists in Recycle Bin. Use Restore.');
            }
            throw new Error('Roll Number already exists.');
        }

        // 2. Head of Office Conflict Check
        // Note: For full correctness, we might need to check against ALL users in DB.
        // If is_head is true, we must ensure no one else is head of the same office.
        if (staffData.is_head) {
            await this.ensureSingleHead(staffData);
        }

        // 3. Defaults
        const newUser = {
            ...staffData,
            password_hash: 'Welcome@123',
            must_change_password: true,
            is_deleted: false
        };

        // 4. Persist
        // Note: handle 'departments' array -> string/JSON conversion if needed, 
        // strictly speaking prisma schema expects String for departments.
        if (Array.isArray(newUser.departments)) {
            newUser.departments = JSON.stringify(newUser.departments);
        }

        return await userRepository.create(newUser);
    }

    /**
     * Ensures only one person is Head for the given office/location.
     * Logic ported from legacy index.js ensureSingleHead
     */
    async ensureSingleHead(targetUser) {
        const existingHead = await userRepository.findHeadByContext(
            targetUser.office_level,
            targetUser.linked_branch_code,
            targetUser.linked_region_code
        );

        if (existingHead && existingHead.roll_number !== targetUser.roll_number) {
            // Conflict found!
            // In the legacy system, it would silently unset the 'is_head' flag of the OLD user.
            // "if (conflict) u.is_head = false;"

            // We should replicate this behavior effectively.
            // Disable is_head for the existing user.
            await userRepository.update(existingHead.roll_number, { is_head: false });
        }
    }
}

module.exports = new StaffService();
