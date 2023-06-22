//// Modules

//// Services
const db = require("../services/database.js").config;

let getPosts = () =>
    new Promise((resolve, reject) => {
        let sql = "SELECT * FROM posts";
        db.query(sql, function (err, posts, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(posts);
            }
        });
    });

let getPost = (postID) =>
    new Promise((resolve, reject) => {
        let sql = "SELECT * FROM posts " +
            "INNER JOIN users ON users.userID = posts.userID " +
            "where id =" + db.escape(postID);
        db.query(sql, function (err, posts, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(posts[0]);
            }
        });
    });

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
                console.log(err)
                const error = new Error("Bad Request");
                error.status = 400;
                reject(error);
            } else {
                console.log(result.affectedRows + " rows have been affected");
                resolve(result);
            }
        });
    });

let deletePost = (postID) =>
    new Promise((resolve, reject) => {
        let sql = "DELETE FROM posts WHERE id =" + parseInt(postID);
        db.query(sql, function (err, result, fields) {
            if (err) {
                console.log(err)
                const error = new Error("Internal Server Error");
                error.status = 500;
                reject(error);
            } else {
                console.log(result.affectedRows + " rows have been deleted");
                resolve()
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
