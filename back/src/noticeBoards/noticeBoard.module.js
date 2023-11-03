const noticeService = require("./noticeBoard.service");
const noticeController = require("./noticeBoard.controller");
const noticeService = require("./noticeBoard.service");
const { noticeBoards } = require("../entity");

const noticeService = new noticeService(noticeBoards);
const noticeController = new noticeController(noticeService);

module.exports = {
  noticeController,
};
