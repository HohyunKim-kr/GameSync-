const express = require("express");
const router = express.Router();
// const ideaboardController = rqeuire("./ideaBoard.controller");

router.get("/ideaBoards/", (req, res) => {
  res.render("ideaBoards/ideaBoard.list.html");
});

router.get("/ideaBoards/write", (req, res) => {
  res.render("ideaBoards/ideaBoard.write.html");
});

router.get("/ideaBoards/view", (req, res) => {
  res.render("ideaBoards/ideaBoard.view.html");
});

router.get("/ideaBoards/modify", (req, res) => {
  res.render("ideaBoards/ideaBoard.modify.html");
});

module.exports = router;
