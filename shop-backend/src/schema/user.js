const z = require("zod");

// Define the shape of user data
const UserBody = z.object({
    email: z.string({ required_error: "Email is required" }),
    name: z.string({ required_error: "Name is required" }),
    password: z.string({ required_error: "Password is required" }),
});

// Payload wrapper for creating users
const payload = {
    body: UserBody,
};

// Schemas for validation
const getUserSchema = z.object({
    UserBody,
});

const createUserSchema = z.object({
    ...payload,
});

module.exports = {
    getUserSchema,
    createUserSchema,
};
