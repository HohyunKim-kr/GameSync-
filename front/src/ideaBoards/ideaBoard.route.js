const express = require("express");
const router = express.Router();
const ideaboardController = require("./ideaBoard.controller");

router.get("/ideaBoards/", ideaboardController.list);

router.get("/ideaBoards/write", ideaboardController.getWrite);

router.get("/ideaBoards/view", ideaboardController.view);

router.get("/ideaBoards/modify", ideaboardController.modify);

module.exports = router;
