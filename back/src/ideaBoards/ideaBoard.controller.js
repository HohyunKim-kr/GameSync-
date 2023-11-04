const { IdeaBoardsRequestDTO } = require("./ideaBoard.dto");
const ideaBoardService = require("./ideaBoard.service");

exports.create = async (req, res, next) => {
    try {
        // console.log(req.body);
        const ideaBoardsRequestDTO = new IdeaBoardsRequestDTO(req.body);
        // res.send("create");

        const response = await ideaBoardService.createBoard(
            ideaBoardsRequestDTO
        );
        res.status(201).json(response);
    } catch (e) {
        next(e);
    }
};
exports.findAll = async (req, res, next) => {
    try {
        const response = await ideaBoardService.findAllBoard();
        res.send("find all!!!!!!");
    } catch (e) {
        next(e);
    }
};
exports.findOne = async (req, res, next) => {
    try {
        const response = await ideaBoardService.findOneBoard();
        res.send("find one!");
    } catch (e) {
        next(e);
    }
};
exports.update = async (req, res, next) => {
    try {
        const response = await ideaBoardService.updateBoard();
        res.send("update");
    } catch (e) {
        next(e);
    }
};
exports.delete = async (req, res, next) => {
    try {
        const response = await ideaBoardService.deleteBoard();
        res.send("delete");
    } catch (e) {
        next(e);
    }
};
