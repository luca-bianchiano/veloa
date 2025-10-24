const { PrismaClient } = require("@prisma/client");
const metrics = require("../utils/metrics");

const prisma = new PrismaClient();

async function createUser(input) {
    const metricsLabels = { operation: "Create User" };
    const timer = metrics.databaseResponseTimeHistogram.startTimer();

    try {
        const existingUser = await prisma.user.findFirst({
            where: { email: input.email },
        });

        if (existingUser) {
            throw new Error("User already registered.");
        }

        const newUser = await prisma.user.create({ data: input });

        timer({ ...metricsLabels, success: "true" });
        return newUser;
    } catch (error) {
        timer({ ...metricsLabels, success: "false" });
        throw error;
    }
}

async function getUserByEmail(email) {
    try {
        const user = await prisma.user.findFirst({
            where: { email },
        });
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUserByEmail,
};
