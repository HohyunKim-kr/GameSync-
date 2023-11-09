const express = require("express");
const router = express.Router();
const ideaBoardsRouter = require("./ideaBoards/ideaBoard.route");
const developBoardsRouter = require("./developBoards/developBoard.route");
const noticesRouter = require("./noticeBoards/noticeBoard.route");

// router.get("/", (req, res) => {
//     res.render("index.html");
// });

router.use("/ideaBoards", ideaBoardsRouter);
router.use("/developBoards", developBoardsRouter);
router.use("/noticeBoards", noticesRouter);

module.exports = router;
