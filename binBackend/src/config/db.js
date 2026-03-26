const { PrismaClient } = require('@prisma/client');
const { logger } = require('../utils/logger');

const prisma = new PrismaClient({
  log: ['warn', 'error']
});

async function connect_db() {
<<<<<<< HEAD
  try {
    await prisma.$connect();
    console.log("✅ DB CONNECTED SUCCESSFULLY");
    logger.info('Database connected successfully');
  } catch (err) {
    console.error("❌ DB CONNECTION FAILED:", err);
  }
=======
  await prisma.$connect();
  logger.info('Database connected successfully');
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6
}

async function disconnect_db() {
  await prisma.$disconnect();
}

module.exports = {
  prisma,
  connect_db,
  disconnect_db
};
