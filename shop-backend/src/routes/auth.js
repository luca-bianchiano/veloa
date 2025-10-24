const express = require("express");
const { PrismaClient } = require("@prisma/client");
const validateResource = require("../middleware/validateResource");
const authController = require("../controller/auth.controller");
const authSchema = require("../schema/auth");

const router = express.Router();
const prisma = new PrismaClient();

// Login route
router.post(
  "/login",
  validateResource(authSchema.loginSchema),
  authController.loginHandler
);

// Signup route
router.post(
  "/signup",
  validateResource(authSchema.signupSchema),
  authController.signupHandler
);

// Logout route
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.send("Logged out successfully");
  });
});

module.exports = router;
