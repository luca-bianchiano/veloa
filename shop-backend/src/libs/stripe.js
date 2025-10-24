require("dotenv").config();

// Get the Stripe secret key from environment variables
const stripeSecretKey = process.env.STRIPESECRETKEY;

// Throw an error if the key is missing
if (!stripeSecretKey) {
    throw new Error("No valid Stripe secret key found. Please check your .env file.");
}

// Initialize and export the Stripe client
const stripe = require("stripe")(stripeSecretKey);
module.exports = { stripe };
