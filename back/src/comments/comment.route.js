const express = require("express");
const router = express.Router();
const commentController = require("./comment.controller");

router.get("/", commentController.getAllComments);

router.post("/", commentController.addComment);

router.put("/:id", commentController.updateComment);

router.delete("/:id", commentController.deleteComment);

module.exports = router;
