const developBoardService = require("./developBoard.service");

exports.getList = async (req, res, next) => {
  try {
    const developBoards = await developBoardService.getList();
    res.json(developBoards);
  } catch (e) {
    next(e, "developBoard 목록 조회에 실패했습니다.");
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const developBoardId = req.params.id;
    const developBoard = await developBoardService.findOne(developBoardId);
    res.json(developBoard);
  } catch (e) {
    next(e);
  }
};

exports.postWrite = async (req, res, next) => {
  try {
    const boardData = {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      image: req.file.filename,
    };

    console.log(req.file); // 객체 출력
    const developBoard = await developBoardService.postWrite(boardData);
    res.json(developBoard);
  } catch (e) {
    next(e, "developBoard 작성에 실패했습니다.");
  }
};

exports.putUpdate = async (req, res, next) => {
  try {
    const developBoardId = req.params.id;
    const boardData = {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      image: req.file.filename,
    };

    const developBoard = await developBoardService.putUpdate(
      developBoardId,
      boardData
    );
    res.json(developBoard);
  } catch (e) {
    next(e, "developBoard 수정에 실패했습니다.");
  }
};

exports.delete = async (req, res, next) => {
  try {
    const developBoardId = req.params.id;
    await developBoardService.delete(developBoardId);
    res.sendStatus(204);
  } catch (e) {
    next(e, "developBoard 삭제에 실패했습니다.");
  }
};
