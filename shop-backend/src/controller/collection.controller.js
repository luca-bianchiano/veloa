const collectionServices = require("../service/collection.services");

async function createCollectionHandler(req, res) {
    try {
        const collection = await collectionServices.createCollection(req.body);
        return res.send(collection);
    } catch (err) {
        return res.sendStatus(400);
    }
}

async function getCollectionsHandler(req, res) {
    try {
        const collections = await collectionServices.listCollections(req);
        return res.send(collections);
    } catch (err) {
        return res.sendStatus(400);
    }
}

async function getCollectionHandler(req, res) {
    try {
        const collection = await collectionServices.getCollection(req.params);
        return res.send(collection);
    } catch (err) {
        return res.sendStatus(400);
    }
}

async function getCollectionProductsHandler(req, res) {
    try {
        const products = await collectionServices.getCollectionProducts(req.params);
        return res.send(products);
    } catch (err) {
        return res.sendStatus(400);
    }
}

async function updateCollectionHandler(req, res) {
    try {
        const collection = await collectionServices.updateCollection(req.params, req.body);
        return res.send(collection);
    } catch (err) {
        return res.sendStatus(400);
    }
}

async function deleteCollectionHandler(req, res) {
    try {
        const collection = await collectionServices.deleteCollection(req.params);
        return res.send(collection);
    } catch (err) {
        return res.sendStatus(400);
    }
}

module.exports = {
    createCollectionHandler,
    getCollectionsHandler,
    getCollectionHandler,
    getCollectionProductsHandler,
    updateCollectionHandler,
    deleteCollectionHandler
};
