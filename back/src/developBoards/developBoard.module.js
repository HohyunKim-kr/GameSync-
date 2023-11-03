const DevService = require("./developBoard.service");
const DevController = require("./developBoard.controller");
const { DevelopBoards } = require("../board/devBoards.entity");

const devService = new DevService(DevelopBoards);
const devController = new DevController(devService);

module.exports = {
  devController,
};
