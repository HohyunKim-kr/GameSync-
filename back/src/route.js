const express = require("express");
const router = express.Router();
const ideaBoardsRouter = require("./ideaBoards/ideaBoards.route");
// const developBoardsRouter = require("./developBoards/developBoards.route");
const noticesRouter = require("./noticeBoards/notices.route");

// router.get("/", (req, res) => {
//     res.render("index.html");
// });

router.use("/ideaBoards", ideaBoardsRouter);
// router.use("/developBoards", developBoardsRouter);
router.use("/noticeBoards", noticesRouter);

module.exports = router;
