const db = require("../services/database.js").config;

/**
 * Creates a new reply for a post.
 *
 * @param {number} postID - The ID of the post the reply belongs to.
 * @param {string} comment - The comment content of the reply.
 * @param {number} userID - The ID of the user creating the reply.
 * @returns {Promise<number>} A promise that resolves to the ID of the created reply.
 * @throws {Error} If an error occurs while creating the reply.
 *
 * @description This function creates a new reply in the database associated with a specific post.
 *              It performs a SQL query to insert the reply data and associates it with the provided post ID and user ID.
 *              The ID of the created reply is resolved if creation is successful.
 */
function createReply(postID, comment, userID) {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO reply (postID, comment, userID) VALUES (?, ?, ?)",
            [postID, comment, userID],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.insertId);
                }
            }
        );
    });
}

/**
 * Retrieves a specific reply by its ID.
 *
 * @param {number} replyID - The ID of the reply to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the retrieved reply object.
 * @throws {Error} If an error occurs while retrieving the reply.
 *
 * @description This function retrieves a specific reply from the database based on its ID.
 *              It performs a SQL query to fetch the reply and the associated user data.
 *              The reply object is resolved if retrieval is successful.
 */
let getReply = (replyID) =>
    new Promise((resolve, reject) => {
        let sql = "SELECT * FROM reply " +
            "INNER JOIN users ON reply.userID = users.userID " +
            "WHERE id =" + db.escape(replyID);
        db.query(sql, function (err, posts, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(posts[0]);
            }
        });
    });

/**
 * Retrieves all replies for a specific post.
 *
 * @param {number} postID - The ID of the post to retrieve replies for.
 * @returns {Promise<Array>} A promise that resolves to an array of reply objects.
 * @throws {Error} If an error occurs while retrieving the replies.
 *
 * @description This function retrieves all replies associated with a specific post from the database.
 *              It performs a SQL query to fetch the replies and the associated user data, ordered by time in descending order.
 *              The array of reply objects is resolved if retrieval is successful.
 */
function getRepliesByPostID(postID) {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM reply INNER JOIN users ON users.userID = reply.userID WHERE postID = ? ORDER BY time DESC",
            [postID],
            (error, results) => {
                console.log(results);
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });
}

/**
 * Updates a reply.
 *
 * @param {Object} replyData - The updated reply data.
 * @param {number} replyID - The ID of the reply to update.
 * @returns {Promise<Object>} A promise that resolves to the updated reply object.
 * @throws {Error} If an error occurs while updating the reply.
 *
 * @description This function updates an existing reply in the database based on its ID.
 *              It performs a SQL query to update the reply with the provided data.
 *              The updated reply object is resolved if the update is successful.
 */
let editReply = (replyData, replyID) =>
    new Promise(async (resolve, reject) => {
        console.log("Updating Reply");

        let updates = [];

        if (replyData.comment) {
            updates.push("comment = " + db.escape(replyData.comment));
        }

        let sql =
            "UPDATE reply SET " +
            updates.join(", ") +
            " WHERE id = " +
            parseInt(replyID);
        replyData.replyID = parseInt(replyID);
        console.log(sql);

        db.query(sql, function (err, result, fields) {
            if (err) {
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
 * Deletes a reply.
 *
 * @param {number} replyID - The ID of the reply to delete.
 * @returns {Promise<Object>} A promise that resolves to the deleted reply object.
 * @throws {Error} If an error occurs while deleting the reply.
 *
 * @description This function deletes an existing reply from the database based on its ID.
 *              It performs a SQL query to delete the reply.
 *              The deleted reply object is resolved if deletion is successful.
 */
let deleteReply = (replyID) =>
    new Promise((resolve, reject) => {
        let sql = "DELETE FROM reply WHERE id =" + parseInt(replyID);
        db.query(sql, function (err, result, fields) {
            if (err) {
                console.log(err);
                const error = new Error("Internal Server Error");
                error.status = 500;
                reject(error);
            } else {
                console.log(result.affectedRows + " rows have been deleted");
                resolve(result);
            }
        });
    });

module.exports = {
    createReply,
    getReply,
    getRepliesByPostID,
    editReply,
    deleteReply
};
