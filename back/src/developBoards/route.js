const express = require("express");
const router = express.Router();
const boardRouter = require("./board/boardRoot");

router.use("/boards", boardRouter);

module.exports = router;
