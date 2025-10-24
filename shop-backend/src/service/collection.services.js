const { PrismaClient } = require("@prisma/client");
const metrics = require("../utils/metrics");

const prisma = new PrismaClient();

async function createCollection(data) {
    const timer = metrics.databaseResponseTimeHistogram.startTimer();
    const labels = { operation: "Create Collection" };

    try {
        const result = await prisma.collection.create({ data });
        timer({ ...labels, success: "true" });
        return result;
    } catch (error) {
        timer({ ...labels, success: "false" });
        throw error;
    }
}

async function getCollection({ collectionId }) {
    const timer = metrics.databaseResponseTimeHistogram.startTimer();
    const labels = { operation: "Get Collection" };

    try {
        const collection = await prisma.collection.findUnique({
            where: { id: parseInt(collectionId) },
            include: { products: true },
        });
        timer({ ...labels, success: "true" });
        return collection;
    } catch (error) {
        timer({ ...labels, success: "false" });
        throw error;
    }
}

async function getCollectionProducts({ collectionId }) {
    const timer = metrics.databaseResponseTimeHistogram.startTimer();
    const labels = { operation: "Get Collection Products" };

    try {
        const collection = await prisma.collection.findUnique({
            where: { id: parseInt(collectionId) },
            include: { products: { include: { product: true } } },
        });
        timer({ ...labels, success: "true" });
        return collection?.products.map(({ product }) => product);
    } catch (error) {
        timer({ ...labels, success: "false" });
        throw error;
    }
}

async function listCollections() {
    const timer = metrics.databaseResponseTimeHistogram.startTimer();
    const labels = { operation: "List Collections" };

    try {
        const collections = await prisma.collection.findMany({
            orderBy: { id: "asc" },
        });
        timer({ ...labels, success: "true" });
        return collections;
    } catch (error) {
        timer({ ...labels, success: "false" });
        throw error;
    }
}

async function deleteCollection({ collectionId }) {
    const timer = metrics.databaseResponseTimeHistogram.startTimer();
    const labels = { operation: "Delete Collection" };

    try {
        const collection = await prisma.collection.findFirst({
            where: { id: parseInt(collectionId) },
        });
        timer({ ...labels, success: "true" });
        return collection;
    } catch (error) {
        timer({ ...labels, success: "false" });
        throw error;
    }
}

async function updateCollection({ collectionId }, data) {
    const timer = metrics.databaseResponseTimeHistogram.startTimer();
    const labels = { operation: "Update Collection" };

    try {
        const updated = await prisma.collection.update({
            where: { id: parseInt(collectionId) },
            data,
        });
        timer({ ...labels, success: "true" });
        return updated;
    } catch (error) {
        timer({ ...labels, success: "false" });
        throw error;
    }
}

module.exports = {
    createCollection,
    getCollection,
    getCollectionProducts,
    listCollections,
    deleteCollection,
    updateCollection,
};
