const express = require("express");
const collectionController = require("../controller/collection.controller");
const validate = require("../middleware/validateResource");
const collectionSchema = require("../schema/collection");

const router = express.Router();

// Get a single collection
router.get(
  "/:collectionId",
  validate(collectionSchema.getCollectionSchema),
  collectionController.getCollectionHandler
);

// Get products in a collection
router.get(
  "/:collectionId/products",
  validate(collectionSchema.getCollectionSchema),
  collectionController.getCollectionProductsHandler
);

// Get all collections
router.get(
  "/",
  validate(collectionSchema.getCollectionsSchema),
  collectionController.getCollectionsHandler
);

// Create a new collection
router.post(
  "/",
  validate(collectionSchema.createCollectionSchema),
  collectionController.createCollectionHandler
);

// Update a collection
router.put("/:collectionId", collectionController.updateCollectionHandler);

// Delete a collection
router.delete(
  "/:collectionId",
  validate(collectionSchema.deleteCollectionSchema),
  collectionController.deleteCollectionHandler
);

module.exports = router;
