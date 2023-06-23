//// Modules

//// Services
const db = require("../services/database.js").config;

/**
 * Retrieves a specific post by its ID.
 *
 * @param {number} postID - The ID of the post to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the retrieved post object.
 * @throws {Error} If an error occurs while retrieving the post.
 *
 * @description This function retrieves a specific post from the database based on its ID.
 *              It performs a SQL query to fetch the post and the associated user data.
 *              The post object is resolved if retrieval is successful.
 */
let getPost = (postID) =>
    new Promise((resolve, reject) => {
        let sql = "SELECT * FROM posts " +
            "INNER JOIN users ON users.userID = posts.userID " +
            "WHERE id =" + db.escape(postID);
        db.query(sql, function (err, posts, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(posts[0]);
            }
        });
    });

/**
 * Retrieves all posts.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of post objects.
 * @throws {Error} If an error occurs while retrieving the posts.
 *
 * @description This function retrieves all posts from the database.
 *              It performs a SQL query to fetch all posts, ordered by time in descending order.
 *              The array of post objects is resolved if retrieval is successful.
 */
let getPosts = () =>
    new Promise((resolve, reject) => {
        let sql = "SELECT * FROM posts ORDER BY time DESC";
        db.query(sql, function (err, posts, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(posts);
            }
        });
    });

/**
 * Creates a new post.
 *
 * @param {Object} post - The post data.
 * @param {number} userID - The ID of the user creating the post.
 * @returns {Promise<Object>} A promise that resolves to the created post object.
 * @throws {Error} If an error occurs while creating the post.
 *
 * @description This function creates a new post in the database.
 *              It performs a SQL query to insert the post data and associates it with the specified user ID.
 *              The created post object is resolved if creation is successful.
 */
let createPost = (post, userID) =>
    new Promise(async (resolve, reject) => {
        const insertPostQuery =
            "INSERT INTO posts (title, description, userID) VALUES (?, ?, ?)";
        const postValues = [post.title, post.description, userID];

        db.query(insertPostQuery, postValues, function (err, result, fields) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(result.affectedRows + " rows have been added");
                resolve(post);
            }
        });
    });

/**
 * Edits a post.
 *
 * @param {Object} postData - The updated post data.
 * @param {number} postID - The ID of the post to edit.
 * @returns {Promise<Object>} A promise that resolves to the updated post object.
 * @throws {Error} If an error occurs while editing the post.
 *
 * @description This function edits an existing post in the database.
 *              It performs a SQL query to update the post data based on the provided post ID.
 *              The updated post object is resolved if editing is successful.
 */
let editPost = (postData, postID) =>
    new Promise(async (resolve, reject) => {
        console.log("Updating Post");

        let updates = [];

        if (postData.title) {
            updates.push("title = " + db.escape(postData.title));
        }

        if (postData.description) {
            updates.push("description = " + db.escape(postData.description));
        }

        let sql =
            "UPDATE posts SET " +
            updates.join(", ") +
            " WHERE id = " +
            parseInt(postID);
        postData.postID = parseInt(postID);
        console.log(sql);

        db.query(sql, function (err, result, fields) {
            if (err) {
                console.log(err);
                const error = new Error("Bad Request");
                error.status = 400;
                reject(error);
            } else {
                console.log(result.affectedRows + " rows have been affected");
                resolve(result);
            }
        });
    });

/**
 * Deletes a post.
 *
 * @param {number} postID - The ID of the post to delete.
 * @returns {Promise<void>} A promise that resolves if the post is successfully deleted.
 * @throws {Error} If an error occurs while deleting the post.
 *
 * @description This function deletes an existing post from the database based on its ID.
 *              It performs a SQL query to delete the post.
 *              The promise resolves if deletion is successful.
 */
let deletePost = (postID) =>
    new Promise((resolve, reject) => {
        let sql = "DELETE FROM posts WHERE id =" + parseInt(postID);
        db.query(sql, function (err, result, fields) {
            if (err) {
                console.log(err);
                const error = new Error("Internal Server Error");
                error.status = 500;
                reject(error);
            } else {
                console.log(result.affectedRows + " rows have been deleted");
                resolve();
            }
        });
    });

module.exports = {
    getPost,
    getPosts,
    createPost,
    editPost,
    deletePost
};
