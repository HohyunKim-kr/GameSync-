const express = require("express");
const router = express.Router();
const noticeController = require("./noticeBoard.controller");

// notice list R
router.get("/", noticeController.findAll);

// notice write C
router.post("/", noticeController.create);

// notice update U
router.put("/:id", noticeController.update);

// notice delete d
router.delete("/:id", noticeController.delete);

module.exports = router;
