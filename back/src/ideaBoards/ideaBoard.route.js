const express = require("express");
const router = express.Router();
const ideaController = require("./ideaBoard.controller");

// list;
router.get("/", ideaController.findAll);

// hit list;
router.get("/hit", ideaController.findHitFour);
router.get("/last", ideaController.findLastFour);

// write;
router.post("/", ideaController.create);

// view;
router.get("/:id", ideaController.findOne);

// modify;
router.put("/:id", ideaController.update);

//delete
router.delete("/:id", ideaController.delete);

module.exports = router;
