const express = require("express");
const router = express.Router();
// const ideaboardController = rqeuire("./ideaBoard.controller");

router.get("/notices/", (req, res) => {
  res.render("notices/list.html");
});

router.get("/notices/write", (req, res) => {
  res.render("notices/write.html");
});

router.get("/notices/view", (req, res) => {
  res.render("notices/view.html");
});

router.get("/notices/modify", (req, res) => {
  res.render("notices/modify.html");
});

module.exports = router;
