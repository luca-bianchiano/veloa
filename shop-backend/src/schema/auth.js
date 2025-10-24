const z = require("zod");

// Login schema
const loginBody = z.object({
    email: z.string({ required_error: "Email is required" }),
    password: z.string({ required_error: "Password is required" }),
});

const loginSchema = z.object({
    body: loginBody,
});

// Signup schema
const signupSchema = z.object({
    body: z.object({
        email: z.string({ required_error: "Email is required" }),
        name: z.string({ required_error: "Name is required." }),
        password: z.string({ required_error: "Password is required" }),
    }),
});

module.exports = {
    loginSchema,
    signupSchema,
};

// Example: if you had other schemas, you could uncomment and use
// export type ListProductsInput = z.TypeOf<typeof listProductsSchema>
// export type UpdateProductInput = z.TypeOf<typeof updateProductSchema>
// export type DeleteProductInput = z.TypeOf<typeof deleteProductSchema>
