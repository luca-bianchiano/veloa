const cors = require("cors");

function setupCors(app) {
    const corsOptions = {
        origin: process.env.FRONTENDDOMAIN || "http://localhost:5173",
        credentials: true,
        optionSuccessStatus: 200,
    };

    app.use(cors(corsOptions));
}

module.exports = setupCors;
