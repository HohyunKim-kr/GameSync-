const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

// const { postLogin, postSignup } = require("./user.service");
//login
router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);
// sign-up
router.get("/signup", userController.getSignup);
router.post("/signup", userController.postSignup);
// router.get("/logout", userController.getLogout);

// usereInfo
router.get("/user", userController.getUser);
router.get("/admin", userController.getAdmin);
router.get("/user/modify", userController.getUsermodify);
// router.post("/user/modify", userController.postUsermodify);
// router.get("/user/delete", userController.getUserdelete);

// kakoa login
router.get("/kakao", userController.kakaoLogin);
router.get("/kakao/callback", userController.kakaoCallback);

// git login
router.get("/git", userController.gitLogin);
router.get("/git/callback", userController.gitCallback);

module.exports = router;
