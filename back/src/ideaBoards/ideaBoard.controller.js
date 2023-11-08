const { IdeaBoardsRequestDTO } = require("./ideaBoard.dto");
const ideaBoardService = require("./ideaBoard.service");

exports.create = async (req, res, next) => {
    try {
        // console.log(req.body);
        const ideaBoardsRequestDTO = new IdeaBoardsRequestDTO(
            req.body,
            req.flie
        );
        // res.send("create");

        const response = await ideaBoardService.createBoard(
            ideaBoardsRequestDTO
        );
        // console.log(`response controller :`,response);
        res.status(201).json(response);
    } catch (e) {
        next(e);
    }
};
exports.findAll = async (req, res, next) => {
    try {
        const ideaBoardsRequestDTO = new IdeaBoardsRequestDTO(req.body);
        const response = await ideaBoardService.findAllBoard(
            ideaBoardsRequestDTO
        );
        res.status(201).json(response);
        // res.send("find all!!!!!!");
    } catch (e) {
        next(e);
    }
};
exports.findOne = async (req, res, next) => {
    try {
        const ideaBoardId = req.params.id;
        console.log(ideaBoardId);

        const response = await ideaBoardService.findOneBoard(ideaBoardId);
        res.status(201).json(response);
        // res.send("find one!");
    } catch (e) {
        next(e);
    }
};
exports.update = async (req, res, next) => {
    try {
        const ideaBoardId = req.params.id;
        console.log(`back update boardid:`, ideaBoardId);

        const ideaBoardsRequestDTO = new IdeaBoardsRequestDTO(
            req.body,
            req.file
        );
        console.log(`back update ideaBoardsRequestDTO:`, ideaBoardsRequestDTO);
        const response = await ideaBoardService.updateBoard(
            ideaBoardId,
            ideaBoardsRequestDTO
        );

        console.log(`back update response :`, response);

        res.status(201).json(response);
        // res.send("update");
    } catch (e) {
        next(e);
    }
};
exports.delete = async (req, res, next) => {
    try {
        const ideaBoardId = req.params.id;
        const response = await ideaBoardService.deleteBoard(ideaBoardId);
        res.status(201).json(response);
        // res.send("delete");
    } catch (e) {
        next(e);
    }
};
