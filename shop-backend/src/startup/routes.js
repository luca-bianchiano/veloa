const healthCheck = require("../routes/healthCheck");
const swagger = require("../utils/swagger");
const collections = require("../routes/collections");
const products = require("../routes/products");
const cart = require("../routes/cart");
const auth = require("../routes/auth");
const user = require("../routes/user");
const checkout = require("../routes/checkout");

/**
 * Sets up all routes for the Express app
 * @param {import('express').Express} app - The Express application
 * @param {number} port - Port number for Swagger docs
 */
function setupRoutes(app, port) {
    app.use("/api", auth);
    app.use("/api", healthCheck);
    app.use("/api/collections", collections);
    app.use("/api/products", products);
    app.use("/api/cart", cart);
    app.use("/api/user", user);
    app.use("/api/payment", checkout);

    // Setup Swagger documentation
    swagger(app, port);
}

module.exports = setupRoutes;
