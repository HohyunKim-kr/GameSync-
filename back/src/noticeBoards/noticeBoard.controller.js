const { NoticeBoardRequestDTO } = require("./noticeBoard.dto");
const noticeBoardService = require("./noticeBoard.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.create = async (req, res, next) => {
    try {
        const uid = req.headers.authorization;
        const token = uid.split("Bearer ")[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
            req.body.author = decoded.uid;
        });

        const noticeBoardsRequestDTO = new NoticeBoardRequestDTO(
            req.body,
            req.headers,
            req.flie
        );
        console.log(noticeBoardsRequestDTO);

        const response = await noticeBoardService.createBoard(
            noticeBoardsRequestDTO
        );
        res.status(201).json(response);
    } catch (e) {
        console.log(e);
        next(e);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const noticeBoardsRequestDTO = new NoticeBoardRequestDTO(req.body);
        const response = await noticeBoardService.findAllBoard(
            noticeBoardsRequestDTO
        );
        res.status(201).json(response);
    } catch (e) {
        next(e);
    }
};
exports.findOne = async (req, res, next) => {
    try {
        const noticeBoardId = req.params.id;
        console.log(noticeBoardId);
        const isWriting = req.method.toUpperCase() === "POST";

        const response = await noticeBoardService.findOneBoard(
            noticeBoardId,
            isWriting
        );
        res.status(201).json(response);
    } catch (e) {
        next(e);
    }
};
exports.update = async (req, res, next) => {
    try {
        const noticeBoardId = req.params.id;
        const uid = req.headers.authorization;

        const token = uid.split("Bearer ")[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
            req.body.author = decoded.uid;
        });

        const noticeBoardRequestDTO = new NoticeBoardRequestDTO(
            req.body,
            req.headers,
            req.file
        );
        console.log("notice:update", noticeBoardRequestDTO);
        const response = await noticeBoardService.updateBoard(
            noticeBoardId,
            noticeBoardRequestDTO
        );

        res.status(201).json(response);
    } catch (e) {
        next(e);
    }
};
exports.delete = async (req, res, next) => {
    try {
        const noticeBoardId = req.params.id;
        const response = await noticeBoardService.deleteBoard(noticeBoardId);
        res.status(201).json(response);
    } catch (e) {
        next(e);
    }
};
