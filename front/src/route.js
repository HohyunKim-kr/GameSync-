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

    // res.render("index.html", { userinfo });

    //   console.log("유저 정보", req.cookies.cookie);

    // const token = req.cookies.cookie;
    // let userinfo;
    // if (token) {
    //   userinfo = await getUserInfo(token);
    // }

    const ideahitResponse = await axios.get(
        "http://localhost:4000/ideaBoards/hit"
    );
    const idealastResponse = await axios.get(
        "http://localhost:4000/ideaBoards/last"
    );

    const develophitResponse = await axios.get(
        "http://localhost:4000/developBoards/hit"
    );
    const developlastResponse = await axios.get(
        "http://localhost:4000/developBoards/last"
    );

    const ideahitdata = ideahitResponse.data;
    const idealastdata = idealastResponse.data;

    const develophitdata = develophitResponse.data;
    const developlastdata = developlastResponse.data;

    //   console.log(`list controller result :`, hitdata, lastdata);

    res.render("index.html", {
        userinfo,
        ideahitdata,
        idealastdata,
        develophitdata,
        developlastdata,
    });
});

router.use("/users", usersRouter);
// router.use("/users", userDataRouter);
router.use("/develop", developBoardsRouter);
router.use("/idea", ideaBoardsRouter);
router.use("/notice", noticesRouter);

module.exports = router;
