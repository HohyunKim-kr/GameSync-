const IdeaService = require("./idea.service");
const IdeaController = require("./idea.controller");
const {IdeaBoards} = require("../entity");

const ideaService = new IdeaService(IdeaBoards);
const ideaController = new IdeaController(ideaService);

module.exports = {
    ideaController,
};
