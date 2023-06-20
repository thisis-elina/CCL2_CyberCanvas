/**
 Handles a route not found error
 @param {Object} req - The request object representing the incoming HTTP request.
 @param {Object} res - The response object used to send the HTTP response.
 @param {Function} next - The next middleware function in the chain.
 @returns {void}
 */
function notFound(req, res, next) {
    const error = new Error('Not Found - ' + req.originalUrl);
    res.status(404);
    next(error);
}

/**
 Handles errors that occur during request processing
 @param {Object} error - The error object representing the encountered error.
 @param {Object} req - The request object representing the incoming HTTP request.
 @param {Object} res - The response object used to send the HTTP response.
 @param {Function} next - The next middleware function in the chain.
 @returns {void}
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
}