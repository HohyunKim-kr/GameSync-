const express = require("express");
const router = express.Router();
const usersRouter = require("./users/user.route");
const developBoardsRouter = require("./developBoards/developBoard.route");
const ideaBoardsRouter = require("./ideaBoards/ideaBoard.route");
const noticesRouter = require("./notices/noticeBoard.route");
// const userDataRouter = require("./userData/userData.route");

router.get("/", (req, res) => {
  // console.log("res유저 닉네임", data.user_nickname);
  console.log("유저 정보", req.user);
  const userNickname = req.user ? req.data.user_nickname : null;
  res.render("index.html", { userinfo: userNickname });
});

router.use("/users", usersRouter);
// router.use("/users", userDataRouter);
router.use("/develop", developBoardsRouter);
router.use("/idea", ideaBoardsRouter);
router.use("/notice", noticesRouter);

module.exports = router;
