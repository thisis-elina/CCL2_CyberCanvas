//// Services

//// Models
const replyModel = require("../models/replyModel");

/**
 * Retrieves a single reply specified by the replyID parameter.
 *
 * @param {Object} req - HTTP-Request. The request object.
 * @param {Object} res - HTTP-Response. The response object.
 * @param {Function} next - Possible-Middleware. The next middleware function.
 *
 * @returns {Object} - The retrieved reply or an error object.
 *
 * @description This function handles a GET request to retrieve a single reply specified by the replyID parameter.
 *              It returns a JSON object containing the retrieved reply on success or an error object on failure.
 */
function getReply(req, res, next) {
    replyModel
        .getReply(parseInt(req.params.replyID))
        .then((reply) => {
            let jsonReturnObject = {
                success: true,
                data: reply,
            };
            res.status(200);
            res.send(jsonReturnObject);
            return jsonReturnObject;
        })
        .catch((error) => {
            let jsonReturnObject = {
                success: false,
                error: error,
            };
            res.status(500);
            res.send(jsonReturnObject);
            throw error; // Throw the error to propagate it if needed
        });
}

/**
 * Retrieves a list of replies for a specific post specified by the postID parameter.
 *
 * @param {Object} req - HTTP-Request. The request object.
 * @param {Object} res - HTTP-Response. The response object.
 * @param {Function} next - Possible-Middleware. The next middleware function.
 *
 * @returns {Object} - A list of replies or an error object.
 *
 * @description This function handles a GET request to retrieve a list of replies for a specific post specified by the postID parameter.
 *              It returns a JSON object containing the retrieved replies on success or an error object on failure.
 */
function getRepliesByPostID(req, res, next) {
    console.log(req.params.postID);
    replyModel
        .getRepliesByPostID(parseInt(req.params.postID))
        .then((replies) => {
            let jsonReturnObject = {
                success: true,
                data: replies,
            };
            res.status(200);
            res.send(jsonReturnObject);
            return jsonReturnObject;
        })
        .catch((error) => {
            let jsonReturnObject = {
                success: false,
                error: error,
            };
            res.status(500);
            res.send(jsonReturnObject);
            throw error; // Throw the error to propagate it if needed
        });
}

/**
 * Creates a new reply for a specific post specified by the postID parameter.
 *
 * @param {Object} req - HTTP-Request. The request object.
 * @param {Object} res - HTTP-Response. The response object.
 * @param {Function} next - Possible-Middleware. The next middleware function.
 *
 * @returns {Object} - The created reply or an error object.
 *
 * @description This function handles a POST request to create a new reply for a specific post specified by the postID parameter.
 *              It expects the request body to contain the necessary data for creating the reply.
 *              On success, it sends a JSON object containing the created reply in the response.
 */
function createReplyByPostID(req, res, next) {
    replyModel
        .createReply(parseInt(req.params.postID), req.body.comment, parseInt(req.body.userID))
        .then((reply) => {
            let jsonReturnObject = {
                success: true,
                data: reply,
            };
            res.status(200);
            res.send(jsonReturnObject);
            return jsonReturnObject;
        })
        .catch((error) => {
            let jsonReturnObject = {
                success: false,
                error: error,
            };
            res.status(500);
            res.send(jsonReturnObject);
            throw error; // Throw the error to propagate it if needed
        });
}

/**
 * Edits an existing reply specified by the replyID parameter.
 *
 * @param {Object} req - HTTP-Request. The request object.
 * @param {Object} res - HTTP-Response. The response object.
 * @param {Function} next - Possible-Middleware. The next middleware function.
 *
 * @returns {void}
 *
 * @description This function handles a PUT request to edit an existing reply specified by the replyID parameter.
 *              It expects the request body to contain the updated data for the reply.
 *              On success, it sends a success message in the response.
 */
function editReply(req, res, next) {
    replyModel
        .editReply(req.body, req.params.replyID)
        .then((reply) => {
            res.send({ success: "it worky" });
        })
        .catch((error) => res.sendStatus(500));
}

/**
 * Deletes a reply specified by the replyID parameter.
 *
 * @param {Object} req - HTTP-Request. The request object.
 * @param {Object} res - HTTP-Response. The response object.
 * @param {Function} next - Possible-Middleware. The next middleware function.
 *
 * @returns {void}
 *
 * @description This function handles a DELETE request to delete a reply specified by the replyID parameter.
 *              On success, it sends a success message in the response.
 */
function deleteReply(req, res, next) {
    console.log(req.params.replyID);
    replyModel
        .deleteReply(parseInt(req.params.replyID))
        .then((reply) => {
            res.send({ success: "it worky" });
        })
        .catch((error) => {
            res.send({
                error: error,
                status: 500,
                success: false,
            });
        });
}

module.exports = {
    getReply,
    getRepliesByPostID,
    createReplyByPostID,
    editReply,
    deleteReply
};
