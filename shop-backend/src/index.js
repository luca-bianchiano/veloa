require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const routes = require("./startup/routes");
const sessionStore = require("./startup/sessionStore");
const cors = require("./startup/cors");
const serializer = require("./startup/serializer");

const app = express();
const port = Number(process.env.PORT) || 6000;

// Security and logging
app.use(helmet());
app.use(morgan("tiny"));

// Initialize session store, CORS, and serializer
sessionStore(app);
cors(app);
serializer(app);

// Serve static files from 'public'
app.use(express.static("public"));

// Start server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
  routes(app, port);
});

module.exports = app;
