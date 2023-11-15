const { DevelopBoardsRequestDTO } = require("./developBoard.dto");
const developBoardService = require("./developBoard.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.create = async (req, res, next) => {
  try {
    // console.log("헤더 =============", req.body);
    const uid = req.headers.authorization;

    // console.log("uid===========", uid.split("Bearer ")[1]);
    const token = uid.split("Bearer ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      req.body.author = decoded.uid;
      console.log("jwt.verify===============", decoded.uid, req.body);
    });

    const develoBoardsrequestDTO = new DevelopBoardsRequestDTO(
      req.body,
      req.headers,
      req.file
    );
    const response = await developBoardService.createBoard(
      develoBoardsrequestDTO
    );

    res.status(201).json(response);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const developBoardsRequestDTO = new DevelopBoardsRequestDTO(req.body);
    const response = await developBoardService.findAllBoard(
      developBoardsRequestDTO
    );
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const developBoardId = req.params.id;
    // console.log("deve________________", developBoardId);

    const response = await developBoardService.findOneBoard(developBoardId);
    console.log("response....................", response);
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const developBoardId = req.params.id;
    console.log(`back update boardId:`, developBoardId);
    const developBoardRequestDTO = new DevelopBoardsRequestDTO(
      req.body,
      req.file
    );
    const response = await developBoardService.updateBoard(
      developBoardId,
      developBoardRequestDTO
    );

    console.log(`back update response:`, response);
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const developBoardId = req.params.id;
    const response = await developBoardService.deleteBoard(developBoardId);
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};
