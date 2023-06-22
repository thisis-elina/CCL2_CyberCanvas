const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const replyController = require("../controllers/replyController");

router.route('/')
    .get(postController.getPosts)
    .post(postController.createPost);

router.route('/:postID')
    .get(postController.getPost)
    .put(postController.editPost)
    .delete(postController.deletePost)

router.route('/:postID/comments')
    .get(replyController.getRepliesByPostID)
    .post(replyController.createReplyByPostID)

module.exports = router;