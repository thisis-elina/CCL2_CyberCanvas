//// Services

//// Models
const postModel = require("../models/postModel");

/**
 * Retrieves a single post specified by the postID parameter.
 *
 * @param {Object} req - HTTP-Request. The request object.
 * @param {Object} res - HTTP-Response. The response object.
 * @param {Function} next - Possible-Middleware. The next middleware function.
 *
 * @returns {Object} - The retrieved post or an error object.
 *
 * @description This function handles a GET request to retrieve a single post specified by the postID parameter.
 *              It returns a JSON object containing the retrieved post on success or an error object on failure.
 */
function getPost(req, res, next) {
    postModel
        .getPost(parseInt(req.params.postID))
        .then((post) => {
            let jsonReturnObject = {
                success: true,
                data: post,
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
 * Retrieves a list of posts.
 *
 * @param {Object} req - HTTP-Request. The request object.
 * @param {Object} res - HTTP-Response. The response object.
 * @param {Function} next - Possible-Middleware. The next middleware function.
 *
 * @returns {Object} - A list of posts or an error object.
 *
 * @description This function handles a GET request to retrieve a list of posts.
 *              It returns a JSON object containing the retrieved posts on success or an error object on failure.
 */
function getPosts(req, res, next) {
    postModel
        .getPosts()
        .then((posts) => {
            let jsonReturnObject = {
                success: true,
                data: posts,
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
 * Creates a new post.
 *
 * @param {Object} req - HTTP-Request. The request object.
 * @param {Object} res - HTTP-Response. The response object.
 * @param {Function} next - Possible-Middleware. The next middleware function.
 *
 * @returns {void}
 *
 * @description This function handles a POST request to create a new post.
 *              It expects the request body to contain the necessary data for creating the post.
 *              On success, it sends a success message in the response.
 */
function createPost(req, res, next) {
    const userID = parseInt(req.user.id);
    postModel
        .createPost(req.body, userID)
        .then((r) => {
            // Handle success if needed
        });
    console.log(req.body);
    res.send(JSON.stringify({ success: 'Post gut' }));
}

/**
 * Updates an existing post.
 *
 * @param {Object} req - HTTP-Request. The request object.
 * @param {Object} res - HTTP-Response. The response object.
 * @param {Function} next - Possible-Middleware. The next middleware function.
 *
 * @returns {void}
 *
 * @description This function handles a POST request to edit an existing post.
 *              It expects the request body to contain the updated data for the post and the postID parameter to identify the post.
 *              On success, it sends a success message in the response.
 */
function editPost(req, res, next) {
    postModel
        .editPost(req.body, req.params.postID)
        .then((post) => {
            res.send({ success: "it worky" });
        })
        .catch((error) => res.sendStatus(500));
}

/**
 * Deletes a post specified by the postID parameter.
 *
 * @param {Object} req - HTTP-Request. The request object.
 * @param {Object} res - HTTP-Response. The response object.
 * @param {Function} next - Possible-Middleware. The next middleware function.
 *
 * @returns {void}
 *
 * @description This function handles a DELETE request to delete a post specified by the postID parameter.
 *              It sends a success message in the response if the post is deleted successfully, or an error object on failure.
 */
function deletePost(req, res, next) {
    postModel
        .deletePost(parseInt(req.params.postID))
        .then((data) => {
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
    getPost,
    getPosts,
    createPost,
    editPost,
    deletePost
};
