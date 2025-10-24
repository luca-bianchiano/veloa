// Helper to create an error response
function createErrorResponse(status, message) {
    return {
        error: {
            status,
            message,
        },
    };
}

// Handles sending the response
function handleResponse(response, res) {
    if (response.error) {
        res.status(response.error.status).send(response.error.message);
    } else {
        res.status(200).send(response.body);
    }
}

// Export the functions
module.exports = {
    createErrorResponse,
    handleResponse,
};
