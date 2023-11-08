const express = require("express");
const router = express.Router();
const developboardController = require("./developBoard.controller");
const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, "./uploads");
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      // aws1, .png
      const filename =
        path.basename(file.originalname, ext) + "_" + Date.now() + ext;
      done(null, filename);
    },
  }),
});

router.get("/developBoards/", developboardController.list);

router.get("/developBoards/write", developboardController.getWrite);

router.post(
  "/developBoards/write",
  upload.single("upload"),
  developboardController.postWrite
);

router.get("/developBoards/view", developboardController.view);

router.get("/developBoards/modify", developboardController.getModify);
router.post(
  "/developBoards/modify",
  upload.single("upload"),
  developboardController.postModify
);

router.post("/developBoards/delete", developboardController.postDelete);

module.exports = router;
