const express = require("express");
const promClient = require("prom-client");
const logger = require("./logger");

const app = express();

// Histogram for REST API response times
const restResponseTimeHistogram = new promClient.Histogram({
    name: "rest_response_time_duration_seconds",
    help: "REST API response time in seconds",
    labelNames: ["method", "route", "status_code"],
});

// Histogram for database response times
const databaseResponseTimeHistogram = new promClient.Histogram({
    name: "db_response_time_duration_seconds",
    help: "Database response time in seconds",
    labelNames: ["operation", "success"],
});

// Start metrics server on port 9100
function startMetricsServer() {
    promClient.collectDefaultMetrics();

    app.get("/metrics", async (req, res) => {
        res.set("Content-Type", promClient.register.contentType);
        const metrics = await promClient.register.metrics();
        res.send(metrics);
    });

    app.listen(9100, () => {
        logger.info("Metrics server started at http://localhost:9100");
    });
}

module.exports = {
    restResponseTimeHistogram,
    databaseResponseTimeHistogram,
    startMetricsServer,
};
