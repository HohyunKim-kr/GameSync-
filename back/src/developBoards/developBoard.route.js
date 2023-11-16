const express = require("express");
const router = express.Router();
const developController = require("./developBoard.controller");

router.get("/", developController.findAll);

router.get("/hit", developController.findHitFour);
router.get("/last", developController.findLastFour);

router.post("/", developController.create);

router.get("/:id", developController.findOne);

router.put("/:id", developController.update);

router.delete("/:id", developController.delete);

module.exports = router;
