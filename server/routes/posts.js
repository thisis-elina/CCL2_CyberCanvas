const express = require("express");
const router = express.Router();
const { Reply, validateReply } = require("../models/replyModel");
const { User } = require("../models/userModel");
const hasAccess = require("../services/authentication.js");
const postController = require("../controllers/postController");
const replyController = require("../controllers/replyController");
const userController = require("../controllers/userController");
const db = require("../services/database.js").config;


router.route('/')
    .get(postController.getPosts)
    .post(postController.createPost);

router.route('/:postID')
    .get(postController.getPost)
    .put(postController.editPost)
    .delete(postController.deletePost)

router.route('/:postID/comments')
    .get(replyController.getRepliesByPostID)
    .post(replyController.createReplyByPostID);

router.route('/:postID/:replyID')
    .get(replyController.getReply)

module.exports = router;