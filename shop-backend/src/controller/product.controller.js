const { createProduct, deleteProduct, getProduct, listProducts, updateProduct } = require("../service/product.services");

async function createProductHandler(req, res) {
    try {
        const product = await createProduct(req.body);
        return res.send(product);
    } catch (err) {
        return res.sendStatus(400);
    }
}

async function listProductsHandler(req, res) {
    try {
        const products = await listProducts({
            searchText: req.query.searchText,
            collectionId: Number(req.query.collectionId),
            pageSize: Number(req.query.pageSize) || 10,
            page: Number(req.query.page) || 1,
        });
        return res.send(products);
    } catch (err) {
        return res.sendStatus(400);
    }
}

async function getProductHandler(req, res) {
    try {
        const product = await getProduct(req.params);
        return res.send(product);
    } catch (err) {
        return res.sendStatus(400);
    }
}

async function updateProductHandler(req, res) {
    try {
        const product = await updateProduct(req.params, req.body);
        return res.send(product);
    } catch (err) {
        return res.sendStatus(400);
    }
}

async function deleteProductHandler(req, res) {
    try {
        const product = await deleteProduct(req.params);
        return res.send(product);
    } catch (err) {
        return res.sendStatus(400);
    }
}

// Export all handlers for CommonJS
module.exports = {
    createProductHandler,
    listProductsHandler,
    getProductHandler,
    updateProductHandler,
    deleteProductHandler
};
