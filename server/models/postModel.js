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
const validatePost = (post) => {
  const schema = Joi.object({
    title: Joi.string().required().min(10).max(80),
    description: Joi.string().required().min(5).max(1024),
    tags: Joi.array(),
  });

  return schema.validate(post);
};

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
  getPosts,
  createPost,
  validatePost,
};
