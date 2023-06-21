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


module.exports = {
    getPost,
    getPosts,
    createPost,
};
