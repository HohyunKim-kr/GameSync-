const DevService = require("./developBoard.service");
const DevController = require("./developBoard.controller");
const { DevBoards } = require("../board/devBoards.entity");

const devService = new DevService(DevBoards);
const devController = new DevController(devService);

module.exports = {
  devController,
};
