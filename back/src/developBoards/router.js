const express = require("express");
const router = express.Router();
const boardRouter = require("./board/board.root");

router.use("/boards", boardRouter);

module.exports = router;
