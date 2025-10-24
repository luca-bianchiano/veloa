const prisma = require("../libs/prisma");
const stripe = require("../libs/stripe");

/**
 * Looks up product details and prepares Stripe line items for an order.
 * @param {Array} order - Array of order items with productId and quantity
 * @returns {Promise<Array>} - Formatted line items for Stripe
 */
async function lookupProductPrice(order) {
    console.log("order", order);

    try {
        const products = await prisma.product.findMany({
            where: {
                id: { in: order.map(item => item.productId) },
            },
        });

        if (!products) {
            throw new Error("No products found.");
        }

        const orderWithDetails = order.map(item => ({
            ...item,
            ...products.find(p => p.id === item.productId),
        }));

        return orderWithDetails.map(item => ({
            price_data: {
                currency: "cad",
                product_data: {
                    name: item.title,
                },
                unit_amount: item.price,
            },
            quantity: item.quantity,
        }));

    } catch (error) {
        console.error("Error fetching product details:", error);
        throw error;
    }
}

/**
 * Creates a Stripe checkout session for a given order.
 * @param {Array} order - Array of order items
 * @returns {Promise<Object>} - Checkout session URL
 */
async function createCheckoutSession(order) {
    const frontEndDomain = process.env.FRONTENDDOMAIN;
    if (!frontEndDomain) {
        throw new Error("No valid FRONTENDDOMAIN found in .env.");
    }

    const lineItems = await lookupProductPrice(order);
    console.log("lineItems", lineItems);

    const session = await stripe.stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${frontEndDomain}/checkoutsucess?success=true`,
        cancel_url: `${frontEndDomain}/cart?canceled=true`,
    });

    return { url: session.url };
}

/**
 * Calculates the total order amount.
 * Currently returns a fixed amount (replace with real calculation).
 */
function calculateOrderAmount(items) {
    return 1400;
}

module.exports = { createCheckoutSession, calculateOrderAmount };
