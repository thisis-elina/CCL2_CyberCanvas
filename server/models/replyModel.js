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
let getReply = (replyID) =>
    new Promise((resolve, reject) => {
        console.log("you in get reply model")
        console.log(replyID)
        let sql = "SELECT * FROM reply " +
            "INNER JOIN users ON reply.userID = users.userID " +
            "where id =" + db.escape(replyID);
        db.query(sql, function (err, posts, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(posts[0]);
            }
        });
    });

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


// Delete Reply
let deleteReply = (replyID) =>
    new Promise((resolve, reject) => {
        let sql = "DELETE FROM reply WHERE id =" + parseInt(replyID);
        db.query(sql, function (err, result, fields) {
            if (err) {
                console.log(err)
                const error = new Error("Internal Server Error");
                error.status = 500;
                reject(error);
            } else {
                console.log(result.affectedRows + " rows have been deleted");
                resolve(result)
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
