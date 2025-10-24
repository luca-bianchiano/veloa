const redis = require("redis");
const session = require("express-session");
const RedisStore = require("connect-redis").default;

function setupSession(app) {
    // Ensure Redis URL is provided
    const redisUrl = process.env.REDISCLOUD_URL;
    if (!redisUrl) throw new Error("Redis URL is not set in environment variables.");

    // Create and connect Redis client
    const redisClient = redis.createClient({ url: redisUrl });
    redisClient.connect().catch(console.error);

    // Trust proxy for secure cookies behind proxies
    app.set("trust proxy", 1);

    // Ensure cookie secret is provided
    const cookieSecret = process.env.COOKIE_SECRET;
    if (!cookieSecret) throw new Error("COOKIE_SECRET is not set in environment variables.");

    // Initialize Redis session store
    const store = new RedisStore({
        client: redisClient,
        prefix: "shopit:",
    });

    // Configure session middleware
    app.use(session({
        store: store,
        secret: cookieSecret,
        name: "__shopit_sid",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            httpOnly: false,
            secure: process.env.ENVIRONMENT === "production",
        },
    }));
}

module.exports = setupSession;
