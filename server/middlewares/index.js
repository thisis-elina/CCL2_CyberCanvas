/**
 * Handles a route not found error.
 *
 * @param {Object} req - The request object representing the incoming HTTP request.
 * @param {Object} res - The response object used to send the HTTP response.
 * @param {Function} next - The next middleware function in the chain.
 *
 * @returns {void}
 *
 * @description This function handles a route not found error by creating an error object and passing it to the next middleware function.
 *              It sets the response status code to 404 and includes the original URL in the error message.
 */
function notFound(req, res, next) {
    const error = new Error('Not Found - ' + req.originalUrl);
    res.status(404);
    next(error);
}

/**
 * Handles errors that occur during request processing.
 *
 * @param {Object} error - The error object representing the encountered error.
 * @param {Object} req - The request object representing the incoming HTTP request.
 * @param {Object} res - The response object used to send the HTTP response.
 * @param {Function} next - The next middleware function in the chain.
 *
 * @returns {void}
 *
 * @description This function handles errors that occur during request processing.
 *              It sets the response status code to either the existing status code or 500 if not set.
 *              It sends a JSON response containing the error message and, in non-production environments, the error stack trace.
 */
function errorHandler(error, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: error.message,
        error: process.env.NODE_ENV === 'production' ? {} : error.stack,
    });
}

module.exports = {
    notFound,
    errorHandler
};
