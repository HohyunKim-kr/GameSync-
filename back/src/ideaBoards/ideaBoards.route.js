const express = require("express");
const router = express.Router();
const ideaController = require("./ideaBoards.controller");

// list;
router.get("/", ideaController.findAll);

// write;
router.post("/", ideaController.create);

// view;
router.get("/:id", ideaController.findOne);

// modify;
router.put("/:id", ideaController.update);

//delete
router.delete("/:id", ideaController.delete);

module.exports = router;
