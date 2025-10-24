const express = require("express");
const userController = require("../controller/user.controller");
const cartController = require("../controller/cart.controller");
const validateResource = require("../middleware/validateResource");
const userSchema = require("../schema/user");

const router = express.Router();

// Retrieve a user's cart by their ID
router.get("/:userId/cart", cartController.getCartByUserIdHandler);

// Create a new user with validation
router.post(
  "/",
  validateResource(userSchema.createUserSchema),
  userController.createUserHandler
);

module.exports = router;
