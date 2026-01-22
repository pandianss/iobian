const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUser() {
    try {
        const user = await prisma.user.findUnique({
            where: { roll_number: '63039' }
        });
        console.log('User found:', user ? 'Yes' : 'No');
        if (user) {
            console.log('Roll:', user.roll_number);
            console.log('Password:', user.password_hash);
            console.log('Role:', user.role);
            console.log('Is Deleted:', user.is_deleted);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

checkUser();
