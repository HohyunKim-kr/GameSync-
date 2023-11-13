const commentService = require("./comment.service");
const commentController = require("./comment.controller");
const { comments } = require("../entity");

const commentServiceInstance = new commentService(comments);
const commentControllerInstance = new commentController(commentServiceInstance);

module.exports = {
  commentController: commentControllerInstance,
};
