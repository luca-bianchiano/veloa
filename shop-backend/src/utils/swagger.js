const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const packageInfo = require("../../package.json");
const logger = require("./logger");

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Documentation",
            version: packageInfo.version,
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [
        "./src/controller/*.ts",
        "./src/docs/*.yaml",
        "./src/schema/*.ts",
        "./src/startup/routes.ts",
    ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

function setupSwaggerDocs(app, port) {
    // Serve Swagger UI
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Serve JSON spec
    app.get("/docs.json", (req, res) => {
        res.json(swaggerSpec);
    });

    logger.info(`API docs available at http://localhost:${port}/docs`);
}

module.exports = setupSwaggerDocs;
