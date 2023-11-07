const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const noticeBoardController = require("./noticeBoard.controller");
const multer = require("multer");
// router.get("/notices/", noticeBoardController.list);
// router.post("/notices/write", noticeBoardController.write);
// router.get("/notices/view", noticeBoardController.view);
// router.post("/notices/modify", noticeBoardController.modify);
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, "./uploads");
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname); // 확장자
      // aws1, .png
      const filename =
        path.basename(file.originalname, ext) + "_" + Date.now() + ext;
      done(null, filename);
    },
  }),
});

router.get("/notices/", (req, res) => {
  res.render("notices/list.html");
});

router.get("/notices/write", (req, res) => {
  res.render("notices/write.html");
});

// router.post(
//   "/notices/write",
//   upload.single("upload"),
//   noticeBoardController.write
// );

router.post(
  "/notices/write",
  upload.single("upload"),
  noticeBoardController.write
);

// router.get("/notices/view", (req, res) => {
//   res.render("notices/view.html");
// });
// res.render("notices/view.html");
router.get("/notices/view", noticeBoardController.view);
router.get("/notices/modify", (req, res) => {
  res.render("notices/modify.html");
});

module.exports = router;
