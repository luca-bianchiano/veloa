const { createCheckoutSession } = require("../service/checkout.services");

async function checkoutHandler(req, res) {
    try {
        const { order } = req.body;
        const result = await createCheckoutSession(order);
        res.json(result); // return the checkout session result
    } catch (err) {
        res.sendStatus(400);
    }
}

module.exports = {
    checkoutHandler
};
