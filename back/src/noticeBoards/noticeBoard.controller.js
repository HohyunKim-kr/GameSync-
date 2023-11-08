const { NoticeBoardRequestDTO } = require("./noticeBoard.dto");
const noticeBoardService = require("./noticeBoard.service");

exports.create = async (req, res, next) => {
  try {
    console.log(req.body);
    const requestDTO = new NoticeBoardRequestDTO(req.body);
    const response = await noticeBoardService.createBoard(requestDTO);
    res.status(201).json(response); // 상태 코드를 201로 설정
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

    const response = await noticeBoardService.findOneBoard(noticeBoardId);
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};
exports.update = async (req, res, next) => {
  try {
    const noticeBoardId = req.params.id;

    const noticeBoardRequestDTO = new NoticeBoardRequestDTO(req.body);

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
