const { DevelopBoardsRequestDTO } = require("./developBoard.dto");
const DevelopBoardService = require("./developBoard.service");

exports.create = async (req, res, next) => {
  try {
    if (!(req.body instanceof DevelopBoardsRequestDTO)) {
      throw new Error("req.body는 DevelopBoardsRequestDTO 타입이 아닙니다.");
    }

    const developBoard = await DevelopBoardService.createBoard(req.body);
    res.status(201).json(developBoard);
  } catch (e) {
    next(e);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const developBoard = await DevelopBoardService.findAllBoard();

    res.json(developBoard);
  } catch (e) {
    next(e);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const developBoard = await DevelopBoardService.findOneBoard(req.params.id);

    if (!developBoard) {
      res.status(404).send("게시판을 찾을 수 없습니다.");
      return;
    }

    // 게시판 정보를 응답
    res.json(developBoard);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const developBoard = await DevelopBoardService.findOneBoard(req.params.id);

    if (!developBoard) {
      res.status(404).send("게시판을 찾을 수 없습니다.");
      return;
    }

    developBoard.title = req.body.title;
    developBoard.content = req.body.content;
    developBoard.writer = req.body.writer;

    await developBoard.save();

    res.json(developBoard);
  } catch (e) {
    next(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const developBoard = await DevelopBoardService.findOneBoard(req.params.id);

    if (!developBoard) {
      res.status(404).send("게시판을 찾을 수 없습니다.");
      return;
    }

    await developBoard.destroy();

    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
