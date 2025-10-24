const express = require("express");
const cartController = require("../controller/cart.controller");

const router = express.Router();

// Routes for cart operations
router.get("/:cartId", cartController.getCartHandler);
router.post("/", cartController.createCartHandler);
router.put("/:cartId", cartController.updateCartHandler);
router.delete("/:cartId", cartController.deleteCartHandler);

module.exports = router;
