const { beforeEach } = require("vitest");
const { mockDeep, mockReset } = require("vitest-mock-extended");

// Create a deep mock of Prisma
const prisma = mockDeep();

// Reset the mock before each test
beforeEach(() => {
    mockReset(prisma);
});

module.exports = prisma;
