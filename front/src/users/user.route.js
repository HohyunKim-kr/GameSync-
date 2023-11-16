const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const userController = require("./user.controller");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, "./uploads");
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      const filename =
        path.basename(file.originalname) + "_" + Date.now() + ext;
      done(null, filename);
    },
  }),
});

router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);
// sign-up
router.get("/signup", userController.getSignup);
router.post("/signup", userController.postSignup);
// router.get("/logout", userController.getLogout);

// usereInfo
router.get("/user", userController.getUserPage);
router.get("/user", userController.getUserInfo);
router.get("/admin", userController.getAdmin);
router.get("/user/modify", userController.getUsermodify);
router.post(
  "/user/modify",
  upload.single("upload"),
  userController.postUsermodify
);
// router.get("/user/delete", userController.getUserdelete);

// kakoa login
router.get("/kakao", userController.kakaoLogin);
router.get("/kakao/callback", userController.kakaoCallback);

// git login
router.get("/git", userController.gitLogin);
router.get("/git/callback", userController.gitCallback);

module.exports = router;
