const express = require("express");
const router = express.Router();
// const developBoardsRouter = require("./developBoards/developBoard.route");
const ideaBoardsRouter = require("./ideaBoards/ideaBoard.route");
// const noticesRouter = require("./notices/noticeBoard.route");

router.get("/", (req, res) => {
  res.render("index.html");
});

// router.use("/develop", developBoardsRouter);
router.use("/idea", ideaBoardsRouter);
// router.use("/notice", noticesRouter);

module.exports = router;
