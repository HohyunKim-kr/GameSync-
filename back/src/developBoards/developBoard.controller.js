const { DevelopBoardsRequestDTO } = require("./developBoard.dto");
const developBoardService = require("./developBoard.service");

exports.create = async (req, res, next) => {
  try {
    console.log(req.body);
    const develoBoardsrequestDTO = new DevelopBoardsRequestDTO(
      req.body,
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
    console.log(developBoardId);

    const response = await developBoardService.findOneBoard(developBoardId);
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
