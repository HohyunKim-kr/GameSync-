const express = require("express");
const router = express.Router();
const devController = require("./developBoard.controller");

router.get("/", async (req, res, next) => {
  try {
    const developBoards = await devController.findAll();
    res.send(developBoards);
  } catch (e) {
    console.log("Main Page:", e);
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const developBoard = await devController.create(req.body);
    res.json(developBoard);
  } catch (e) {
    console.log("devBoard:", e);
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const developBoard = await devController.findOne(req.params.id);
    res.json(developBoard);
  } catch (e) {
    console.log("게시물 조회 에러:", e);
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const developBoard = await devController.update(req.params.id, req.body);
    res.json(developBoard);
  } catch (e) {
    console.log("게시물 수정 에러:", e);
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await devController.delete(req.params.id);
    res.status(204).send();
  } catch (e) {
    console.log("게시물 삭제 에러:", e);
    next(e);
  }
});

module.exports = router;
