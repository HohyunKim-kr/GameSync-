const DevService = require("./devBoards.service");
const DevController = require("./devBoards.controller");
const { DevBoards } = require("../board/devBoards.entity");

const devService = new DevService(DevBoards);
const devController = new DevController(devService);

module.exports = {
  devController,
};
