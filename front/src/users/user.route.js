const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

//login
router.get("/login", userController.getLogin);
// router.post("/login", userController.postLogin);
// router.get("/logout", userController.getLogout);

// sign-up
// router.get("/signup", userController.getSignup);
// router.post("/signup", userController.postSignup);

// usereInfo
// router.get("/user", userController.getUser);
// router.get("/user/modify", userController.getUsermodify);
// router.post("/user/modify", userController.postUsermodify);
// router.get("/user/delete", userController.getUserdelete);

module.exports = router;
