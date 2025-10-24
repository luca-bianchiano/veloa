// Middleware to allow access only to admin users
function adminMiddleware(req, res, next) {
    const user = req.user;

    if (!user || user.role !== "ADMIN") {
        return res.status(403).send("Access denied. Admins only.");
    }

    next();
}

module.exports = adminMiddleware;
