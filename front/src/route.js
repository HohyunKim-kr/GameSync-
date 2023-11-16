const express = require("express");
const router = express.Router();
const axios = require("axios");
const usersRouter = require("./users/user.route");
const developBoardsRouter = require("./developBoards/developBoard.route");
const ideaBoardsRouter = require("./ideaBoards/ideaBoard.route");
const noticesRouter = require("./notices/noticeBoard.route");
const { getUserInfo } = require("./users/user.service");

router.get("/", async (req, res) => {
  const token = req.cookies.cookie;
  let userinfo;
  if (token) {
    userinfo = await getUserInfo(token);
  }

  res.render("index.html", { userinfo });
});

router.use("/users", usersRouter);
// router.use("/users", userDataRouter);
router.use("/develop", developBoardsRouter);
router.use("/idea", ideaBoardsRouter);
router.use("/notice", noticesRouter);

module.exports = router;
