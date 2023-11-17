const express = require("express");
const router = express.Router();
const ideaBoardsRouter = require("./ideaBoards/ideaBoard.route");
const developBoardsRouter = require("./developBoards/developBoard.route");
const noticesRouter = require("./noticeBoards/noticeBoard.route");
const userRouter = require("./users/user.router");
const commentsRouter = require("./comments/comment.route");
const adminRouter = require("./users/admin.user.route");
// router.get("/", (req, res) => {
//     res.render("index.html");
// });

router.use("/ideaBoards", ideaBoardsRouter);
router.use("/developBoards", developBoardsRouter);
router.use("/noticeBoards", noticesRouter);
router.use("/users", userRouter);
router.use("/comments", commentsRouter);
router.use("/admin", adminRouter);

module.exports = router;
