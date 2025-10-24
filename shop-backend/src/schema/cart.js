const z = require("zod");

// Schema for individual cart items
const CartItemSchema = z.object({
    productId: z.number({ required_error: "Product ID is required." }),
    quantity: z.number({ required_error: "Quantity is required." }),
});

// Shared payload schema for creating/updating carts
const PayloadSchema = {
    body: z.object({
        userId: z.number({ required_error: "User ID is required." }),
        items: z.array(CartItemSchema),
    }),
};

// Shared params schema for operations requiring cartId
const ParamsSchema = {
    params: z.object({
        cartId: z.string({ required_error: "Cart ID is required." }),
    }),
};

// Shared query schema for listing carts
const QuerySchema = {
    query: z.object({
        page: z.number().optional(),
        collections: z.string().optional(),
    }),
};

// Exported schemas
module.exports.getCartSchema = z.object(ParamsSchema);
module.exports.listCartsSchema = z.object(QuerySchema);
module.exports.createCartItemSchema = z.object({ ...ParamsSchema, body: CartItemSchema });
module.exports.createCartSchema = z.object(PayloadSchema);
module.exports.updateCartSchema = z.object({ ...PayloadSchema, ...ParamsSchema });
module.exports.deleteCartSchema = z.object({ ...ParamsSchema, ...PayloadSchema });
