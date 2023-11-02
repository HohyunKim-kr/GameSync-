const DevService = require("./idea.service");
const DevController = require("./idea.controller");
// const { devBoards } = require("../entity");

const devService = new DevService(IdeaBoards);
const devController = new DevController(devService);

module.exports = {
  devController,
};
