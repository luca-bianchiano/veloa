const express = require("express");
const checkoutController = require("../controller/checkout.controller");

const router = express.Router();

// Route for creating a checkout session
router.post("/create-checkout-session", checkoutController.checkoutHandler);

module.exports = router;
