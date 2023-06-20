const { db } = require("../services/database.js");

// Insert a new Reply
function insertReply(postId, comment, authorId) {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO reply (post_id, comment, author_id) VALUES (?, ?, ?)",
            [postId, comment, authorId],
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
function getReplyById(replyId) {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM reply WHERE id = ?",
            [replyId],
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

// Function to validate replies
function validateReply(reply) {
    const schema = Joi.object({
        comment: Joi.string().required().min(3).max(5000),
    });
    return schema.validate(reply);
}

module.exports = {
    insertReply,
    getReplyById,
    updateReply,
    deleteReply,
    validateReply,
};
