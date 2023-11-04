const { noticecBoardRequesDTO } = require("./noticeBoard.dto");
const noticeBoardService = require("./noticeBoard.service");

exports.create = async (req, res, next) => {
  try {
    const noticecBoardRequesDTO = new noticecBoardRequesDTO(req.body);
    const response = await noticeBoardService.createBoard(
      noticecBoardRequesDTO
    );
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};
exports.findAll = async (req, res, next) => {};
exports.findOne = async (req, res, next) => {};
exports.update = async (req, res, next) => {};
exports.delete = async (req, res, next) => {};
