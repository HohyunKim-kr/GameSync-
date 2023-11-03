<<<<<<< HEAD
const IdeaService = require("./idea.service");
const IdeaController = require("./idea.controller");
=======
const IdeaService = require("./ideaBoard.service");
const IdeaController = require("./ideaBoard.controller");
>>>>>>> 2b8c0f218015e470886155af444e4a35feef3234
const { IdeaBoards } = require("../entity");

const ideaService = new IdeaService(IdeaBoards);
const ideaController = new IdeaController(ideaService);

module.exports = {
  ideaController,
};
