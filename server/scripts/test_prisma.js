const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: 'file:../../data/iobian.db'
        }
    },
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
    console.log('Connecting...');
    const count = await prisma.user.count();
    console.log('User count:', count);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
