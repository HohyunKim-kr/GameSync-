const { IdeaBoardsRequestDTO } = require("./ideaBoard.dto");
const ideaBoardService = require("./ideaBoard.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.create = async (req, res, next) => {
    try {
        const uid = req.headers.authorization;

        console.log("uid===========", uid);
        const token = uid.split("Bearer ")[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
            req.body.author = decoded.uid;
        });

        const ideaBoardsRequestDTO = new IdeaBoardsRequestDTO(
            req.body,
            req.headers,
            req.flie
        );

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
