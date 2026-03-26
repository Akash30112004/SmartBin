const { prisma } = require('../config/db');

async function find_user_by_email(email) {
<<<<<<< HEAD
  return prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: 'insensitive'
      }
    }
=======
  return prisma.user.findUnique({
    where: { email }
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6
  });
}

async function create_user(payload) {
  return prisma.user.create({
    data: payload
  });
}

module.exports = {
  find_user_by_email,
  create_user
};
