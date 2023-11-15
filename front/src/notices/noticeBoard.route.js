const express = require("express");
const router = express.Router();
const noticeBoardController = require("./noticeBoard.controller");
const multer = require("multer");
const path = require("path");
// multer 미들웨어 장착
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
// list
router.get("/notices/", noticeBoardController.getList);

// write
router.get("/notices/write", noticeBoardController.getWrite);
router.post(
  "/notices/write",
  upload.single("upload"),
  noticeBoardController.postWrite
);

// view
router.get("/notices/view", noticeBoardController.getView);

// modify
router.get("/notices/modify", noticeBoardController.getModify);
router.post(
  "/notices/modify",
  upload.single("upload"),
  noticeBoardController.postModify
);

// delete
router.post("/notices/delete", noticeBoardController.postDelete);

module.exports = router;
