const { PrismaClient } = require("@prisma/client");
const metrics = require("../utils/metrics");

const prisma = new PrismaClient();

// Create a new cart
async function createCart(input) {
    const { userId, items } = input;
    const metricsLabels = { operation: "Create Cart" };
    const timer = metrics.databaseResponseTimeHistogram.startTimer();

    try {
        const result = await prisma.cart.create({
            data: {}, // You can include userId and items if needed
            // include: { items: true }, // Include the created cart items in response
        });
        timer({ ...metricsLabels, success: "true" });
        return result;
    } catch (error) {
        timer({ ...metricsLabels, success: "false" });
        throw error;
    }
}

// Get a cart by its ID
async function getCartById({ cartId }) {
    const metricsLabels = { operation: "Get Cart" };
    const timer = metrics.databaseResponseTimeHistogram.startTimer();

    try {
        const cart = await prisma.cart.findUnique({
            where: { id: parseInt(cartId) },
        });
        timer({ ...metricsLabels, success: "true" });
        return cart;
    } catch (error) {
        timer({ ...metricsLabels, success: "false" });
        throw error;
    }
}

// Delete a cart by its ID
async function deleteCart({ cartId }) {
    const metricsLabels = { operation: "Delete Cart" };
    const timer = metrics.databaseResponseTimeHistogram.startTimer();

    try {
        const result = await prisma.cart.findFirst({
            where: { id: parseInt(cartId) },
        });
        timer({ ...metricsLabels, success: "true" });
        return result;
    } catch (error) {
        timer({ ...metricsLabels, success: "false" });
        throw error;
    }
}

module.exports = {
    createCart,
    getCartById,
    deleteCart,
};
