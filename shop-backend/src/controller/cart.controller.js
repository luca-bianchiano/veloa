const cartService = require("../service/cart.services");

// Create a new cart
async function createCartHandler(req, res) {
    try {
        const cart = await cartService.createCart(req.body);
        return res.send(cart);
    } catch (err) {
        return res.status(500).json({
            error: "An error occurred while creating the cart."
        });
    }
}

// Get a cart by its ID
async function getCartHandler(req, res) {
    try {
        const cart = await cartService.getCartById(req.params);
        return res.send(cart);
    } catch (err) {
        return res.sendStatus(400);
    }
}

// Update a cart (functionality not implemented yet)
async function updateCartHandler(req, res) {
    try {
        // const cart = await cartService.updateCart(req.params, req.body);
        // return res.send(cart);
    } catch (err) {
        return res.sendStatus(400);
    }
}

// Delete a cart by its ID
async function deleteCartHandler(req, res) {
    try {
        const cart = await cartService.deleteCart(req.params);
        return res.send(cart);
    } catch (err) {
        return res.sendStatus(400);
    }
}

// Get carts by user ID (functionality not implemented yet)
async function getCartByUserIdHandler(req, res) {
    try {
        const { userId } = req.params;
        // const carts = await cartService.getCartByUserId({ userId });
        // return res.send(carts);
    } catch (err) {
        return res.sendStatus(400);
    }
}

// Optional class-based controller (can be extended later)
class CartController {
    async getCart() {
        // Not implemented
        return;
    }
}

module.exports = {
    createCartHandler,
    getCartHandler,
    updateCartHandler,
    deleteCartHandler,
    getCartByUserIdHandler,
    CartController
};
