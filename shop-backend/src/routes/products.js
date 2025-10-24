const express = require("express");
const productSchema = require("../schema/product");
const productController = require("../controller/product.controller");
const validateResource = require("../middleware/validateResource");

const router = express.Router();

// Get a product by ID
router.get("/:productId", productController.getProductHandler);

// List all products (with validation)
router.get(
  "/",
  validateResource(productSchema.listProductsSchema),
  productController.listProductsHandler
);

// Create a new product
router.post(
  "/",
  validateResource(productSchema.createProductSchema),
  productController.createProductHandler
);

// Update a product by ID
router.put(
  "/:productId",
  validateResource(productSchema.updateProductSchema),
  productController.updateProductHandler
);

// Delete a product by ID
router.delete(
  "/:productId",
  validateResource(productSchema.deleteProductSchema),
  productController.deleteProductHandler
);

module.exports = router;
