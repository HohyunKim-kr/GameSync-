const express = require("express");
const router = express.Router();

router.get("/developBoards/", (req, res) => {
  res.render("developBoards/list.html");
});

router.get("developBoards/write", (req, res) => {
  res.render("developBoards/write.html");
});

router.get("developBoards/view", (req, res) => {
  res.render("developBoards/view.html");
});

router.get("developBoards/modify", (req, res) => {
  res.render("developBoards/modify.html");
});

module.exports = router;
