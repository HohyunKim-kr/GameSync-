const express = require("express");
const router = express.Router();
const usersRouter = require("./users/user.route");
const developBoardsRouter = require("./developBoards/developBoard.route");
const ideaBoardsRouter = require("./ideaBoards/ideaBoard.route");
const noticesRouter = require("./notices/noticeBoard.route");
// const userDataRouter = require("./userData/userData.route");

router.get("/", (req, res) => {
  console.log("res", req.user_nickname);
  res.render("index.html", { user: req.user_nickname });
});

router.use("/users", usersRouter);
// router.use("/users", userDataRouter);
router.use("/develop", developBoardsRouter);
router.use("/idea", ideaBoardsRouter);
router.use("/notice", noticesRouter);

module.exports = router;
