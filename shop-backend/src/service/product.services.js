const prisma = require("../libs/prisma");
const metrics = require("../utils/metrics");

async function createProduct(input) {
    const { collectionIds, ...productData } = input;
    const timer = metrics.databaseResponseTimeHistogram.startTimer();
    const labels = { operation: "Create Product" };

    try {
        const result = await prisma.product.create({ data: productData });
        timer({ ...labels, success: "true" });
        return result;
    } catch (error) {
        timer({ ...labels, success: "false" });
        console.error("Error creating product:", error);
        throw error;
    }
}

async function getProduct({ productId }) {
    const timer = metrics.databaseResponseTimeHistogram.startTimer();
    const labels = { operation: "Get Product" };

    try {
        const product = await prisma.product.findFirst({
            where: { slug: productId },
            include: { 
                collectionsOnProducts: { include: { collection: true } } 
            },
        });
        timer({ ...labels, success: "true" });
        return product;
    } catch (error) {
        timer({ ...labels, success: "false" });
        throw error;
    }
}

async function listProducts({ searchText, collectionId, pageSize = 10, page = 1 }) {
    const timer = metrics.databaseResponseTimeHistogram.startTimer();
    const labels = { operation: "Get Products" };

    const conditions = [];

    if (searchText) {
        conditions.push({
            OR: [
                { title: { contains: searchText.toLowerCase() } },
                { description: { contains: searchText.toLowerCase() } },
            ],
        });
    }

    if (collectionId !== undefined && !Number.isNaN(collectionId)) {
        conditions.push({
            collectionsOnProducts: { some: { collectionId } },
        });
    }

    try {
        const products = await prisma.product.findMany({
            where: { AND: conditions },
            include: { collectionsOnProducts: { select: { collection: true } } },
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: "desc" },
        });
        timer({ ...labels, success: "true" });
        return products;
    } catch (error) {
        timer({ ...labels, success: "false" });
        throw error;
    }
}

async function listProductsByCollection({ collectionSlug, pageSize = 10, page = 1 }) {
    const timer = metrics.databaseResponseTimeHistogram.startTimer();
    const labels = { operation: "List Products by Collection" };

    try {
        const collection = await prisma.collection.findUnique({
            where: { slug: collectionSlug },
            select: { id: true },
        });

        if (!collection) throw new Error("No collection found.");

        const products = await prisma.product.findMany({
            where: { collectionsOnProducts: { some: { collectionId: collection.id } } },
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: "desc" },
        });

        timer({ ...labels, success: "true" });
        return products;
    } catch (error) {
        timer({ ...labels, success: "false" });
        throw error;
    }
}

async function deleteProduct({ productId }) {
    const timer = metrics.databaseResponseTimeHistogram.startTimer();
    const labels = { operation: "Delete Product" };
    const id = parseInt(productId);

    try {
        const result = await prisma.product.delete({ where: { id } });
        timer({ ...labels, success: "true" });
        return result;
    } catch (error) {
        timer({ ...labels, success: "false" });
        throw error;
    }
}

async function updateProduct({ productId }, body) {
    const timer = metrics.databaseResponseTimeHistogram.startTimer();
    const labels = { operation: "Update Product" };
    const id = parseInt(productId);
    const { collectionIds, ...productData } = body;

    try {
        const result = await prisma.product.update({
            where: { id },
            data: {
                ...productData,
                collectionsOnProducts: {
                    deleteMany: {},
                    createMany: { data: (collectionIds || []).map(id => ({ collectionId: id })) },
                },
            },
        });

        timer({ ...labels, success: "true" });
        return result;
    } catch (error) {
        timer({ ...labels, success: "false" });
        throw error;
    }
}

module.exports = {
    createProduct,
    getProduct,
    listProducts,
    listProductsByCollection,
    deleteProduct,
    updateProduct,
};
