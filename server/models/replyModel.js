const db = require("../services/database.js").config;

// Insert a new Reply
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

// Get Reply by ID
function getReply(replyID) {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM reply WHERE id = ?",
            [replyID],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            }
        );
    });
}

// Get Reply by postID
function getRepliesByPostID(postID) {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM reply INNER JOIN users ON users.userID = reply.userID WHERE postID = ?",
            [postID],
            (error, results) => {
                console.log(results)
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });
}

// Update Reply
function updateReply(replyId, comment) {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE reply SET comment = ? WHERE id = ?",
            [comment, replyId],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.affectedRows > 0);
                }
            }
        );
    });
}

// Delete Reply
function deleteReply(replyId) {
    return new Promise((resolve, reject) => {
        db.query(
            "DELETE FROM reply WHERE id = ?",
            [replyId],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.affectedRows > 0);
                }
            }
        );
    });
}


module.exports = {
    createReply,
    getReply,
    getRepliesByPostID,
    updateReply,
    deleteReply
};
