const express = require("express");
const router = express.Router();
const devController = require("./developBoard.controller");

router.get("/", devController.findAll);

router.post("/", devController.create);

router.get("/:id", devController.findOne);

router.put("/:id", devController.update);

delete router.delete("/:id", devController.delete);

module.exports = router;
