const DevService = require("./developBoard.service");
const DevController = require("./developBoard.controller");
const { DevelopBoards } = require("./developBoard.entity");

const developService = new DevService(DevelopBoards);
const developController = new DevController(developService);

module.exports = {
  developController,
};
