const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Reply, validateReply } = require("../models/replyModel");
const { User } = require("../models/userModel");
const hasAccess = require("../services/authentication.js");
const postController = require("../controllers/postController");
const db = require("../services/database.js").config;


router.route('/')
    .get(postController.getPosts)
    .post(postController.createPost);


// router.get("/", async (req, res) => {
//   try {
//     const query = `
//       SELECT p.id, p.title, p.description, u.userName AS author
//       FROM posts p
//       INNER JOIN users u ON p.userID = u.userID
//     `;
//     const [rows] = await db.query(query);
//
//     const all_posts = rows.map((row) => {
//       return {
//         _id: row.id,
//         title: row.title,
//         description: row.description,
//         author: row.author
//       };
//     });
//
//     res.send(all_posts);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal Server Error");
//   }
// });


// router.get("/:id", async (req, res) => {
//   try {
//     const postId = req.params.id;
//
//     //SQL query to fetch the post by ID
//     const query = "SELECT * FROM posts WHERE id = ?";
//     const [rows] = await db.query(query, [postId]);
//
//     if (rows.length === 0) {
//       return res.status(404).send("Post not found");
//     }
//
//     const post = rows[0];
//
//     // Update the views count
//     const updatedViews = post.views + 1;
//     const updateQuery = "UPDATE posts SET views = ? WHERE id = ?";
//     await db.query(updateQuery, [updatedViews, postId]);
//
//     res.send(post);
//   } catch (ex) {
//     return res.status(500).send(ex.message);
//   }
// });

// router.post("/create", hasAccess, async (req, res) => {
//   const { error } = validatePost(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   const tags = req.body.tags;
//   const tags_array = [];
//   for (let i = 0; i < tags.length; i++) {
//     const tagID = tags[i];
//     const query = "SELECT * FROM tags WHERE id = ?";
//     const [rows] = await db.query(query, [tagID]);
//     if (rows.length === 0) return res.status(400).send("Invalid Tag");
//     const tag_in_db = rows[0];
//     tags_array.push(tag_in_db);
//   }
//   const post = new Post({
//     title: req.body.title,
//     tags: tags_array,
//     description: req.body.description,
//     userID: req.user._id,
//     views: 1,
//   });
//   try {
//     await post.save();
//     res.send("Post successfully created.");
//   } catch (err) {
//     console.log("error: ", err);
//   }
// });

// router.put("/like/:id", auth, async (req, res) => {
//   const post = await Post.findById(req.params.id);
//   if (!post) return res.status(400).send("Post doesn't exists");
//   if (post.author == req.user._id)
//     return res.status(400).send("You can't upvote your own post");
//   const upvoteArray = post.upvotes;
//   const index = upvoteArray.indexOf(req.user._id);
//   if (index === -1) {
//     upvoteArray.push(req.user._id);
//   } else {
//     upvoteArray.splice(index, 1);
//   }
//   post.upvotes = upvoteArray;
//   const result = await post.save();
//   const post_new = await Post.find({ _id: post._id }).populate(
//     "author",
//     "name username"
//   );
//   res.send(post_new);
// });

module.exports = router;