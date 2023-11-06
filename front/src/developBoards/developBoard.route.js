const express = require("express");
const router = express.Router();

const developBoardController = require("./developBoards.controller");

router.get("/developBoards/", developBoardController.list);
router.post("/developBoards/write", developBoardController.write);
router.get("/developBoards/view", developBoardController.view);
router.post("/developBoards/modify", developBoardController.modify);

module.exports = router;
