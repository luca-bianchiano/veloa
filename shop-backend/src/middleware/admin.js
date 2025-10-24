// Middleware to allow only admin users
async function admin(req, res, next) {
    if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).send("Access denied.");
    }
    next();
}

module.exports = admin;
