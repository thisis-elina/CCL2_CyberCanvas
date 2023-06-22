const express = require("express");
const router = express.Router();
const replyController = require("../controllers/replyController");


router.route('/:replyID')
    .get(replyController.getReply)
    .put(replyController.editReply)
    .delete(replyController.deleteReply)

module.exports = router;