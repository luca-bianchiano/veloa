// Error-handling middleware for Express
function handleError(err, req, res, next) {
    if (err) {
        res.status(500).send("Something went wrong.");
    }
}

module.exports = handleError;
