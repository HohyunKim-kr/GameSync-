const express = require("express");
const router = express.Router();
const ideaboardController = require("./ideaBoard.controller");
const multer = require("multer");
const path = require("path");

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

router.get("/ideaBoards/", ideaboardController.list);

router.get("/ideaBoards/write", ideaboardController.getWrite);
router.post(
    "/ideaBoards/write",
    upload.single("upload"),
    ideaboardController.postWrite
);

router.get("/ideaBoards/view", ideaboardController.view);

router.get("/ideaBoards/modify", ideaboardController.getModify);
router.post(
    "/ideaBoards/modify",
    upload.single("upload"),
    ideaboardController.postModify
);

router.post("/ideaBoards/delete", ideaboardController.postDelete);
module.exports = router;
