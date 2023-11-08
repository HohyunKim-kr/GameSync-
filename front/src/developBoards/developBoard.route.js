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

router.get("/developBoards/", async (req, res) => {
  const developBoards = await developboardController.getList();
  res.render("developBoards/list", {
    developBoards,
  });
});

router.get("/developBoards/write", async (req, res) => {
  res.render("developBoards/write");
});

router.post(
  "/developBoards/write",
  upload.single("upload"),
  developboardController.postWrite
);

router.use((err, req, res, next) => {
  if (err instanceof DevelopBoardError) {
    res.status(err.statusCode).send(err.message);
  } else {
    res.status(500).send("서버 오류가 발생했습니다.");
  }
});

router.get("/developBoards/view/:id", async (req, res) => {
  const developBoardId = req.params.id;
  const developBoard = await developboardController.findOne(developBoardId);
  res.render("developBoards/view", {
    developBoard,
  });
});

router.get("/developBoards/modify/:id", async (req, res) => {
  const developBoardId = req.params.id;
  const developBoard = await developboardController.findOne(developBoardId);
  res.render("developBoards/modify", {
    developBoard,
  });
});

module.exports = router;
