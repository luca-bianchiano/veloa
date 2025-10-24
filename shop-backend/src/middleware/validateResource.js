const zod = require("zod");

// Middleware for validating request data using a Zod schema
const validate = (schema) => async (req, res, next) => {
    try {
        // Parse request body, query, and params
        await schema.parseAsync({
            body: req?.body,
            query: req?.query,
            params: req?.params,
        });

        // Continue to next middleware if validation passes
        next();
    } catch (error) {
        let err = error;

        // If it's a Zod validation error, format the issues
        if (err instanceof zod.ZodError) {
            err = err.issues.map(issue => ({
                path: issue.path[0],
                message: issue.message,
            }));
        }

        // Send validation error response
        res.status(409).json({
            status: "failed",
            error: err,
        });
    }
};

module.exports = validate;
