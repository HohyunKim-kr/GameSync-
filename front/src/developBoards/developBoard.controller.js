const developBoardService = require("./developBoard.service");
const { getUserInfo } = require("../users/user.service");

exports.list = async (req, res, next) => {
  try {
    const { data } = await developBoardService.getList();
    res.render("developBoards/list.html", { list: data });
  } catch (e) {
    next(e, "developBoard 목록 조회에 실패했습니다.");
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

exports.getWrite = (req, res, next) => {
  res.render("developBoards/write.html");
};

exports.postWrite = async (req, res, next) => {
  try {
    const data = req.body;
    const file = req.file;
    const boardData = {
      title: data.title,
      author: data.author,
      content: data.content,
      category: data.category,
      image: file.filename,
      origina_filename: file.originalname,
    };
    const token = req.cookies.cookie;
    const result = await developBoardService.postWrite(boardData, token);

    const { id } = result.data;
    res.redirect(`./view?id=${id}`);
  } catch (e) {
    next(e, "developBoard 작성에 실패했습니다.");
  }
};

exports.view = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { data } = await developBoardService.getView(id);

    if (data.result.content) {
      data.result.content = data.result.content.replace(/\n/g, "<br>");
    }
    res.render("developBoards/view.html", { data: data });
  } catch (e) {
    next(e);
  }
};

exports.getModify = async (req, res, next) => {
  try {
    const { id } = req.query;
    const token = req.cookies.cookie;

    const { data } = await developBoardService.getModify(id, token);

    if (!token) {
      res.redirect("/users/login");
    }

    const result = await getUserInfo(token);
    if (result.uid !== data.result.author) {
      res.redirect("/users/login");
    } else {
      res.render("developBoards/modify.html", { data: data, id });
    }
  } catch (e) {
    next(e);
  }
};

exports.postModify = async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = req.body;
    const file = req.file;

    const boardData = {
      title: data.title,
      author: data.author,
      content: data.content,
      category: data.category,
      image: file.filename,
      original_filename: file.originalname,
    };
    const token = req.cookies.cookie;

    const { result } = await developBoardService.putModify(
      id,
      boardData,
      token
    );
    console.log(`postWrite controller result :`, result);

    res.redirect(`./view?id=${id}`);
  } catch (e) {
    next(e);
  }
};

exports.postDelete = async (req, res, next) => {
  try {
    const { id } = req.query;
    const token = req.cookies.cookie;

    if (!token) {
      res.redirect("/users/login");
    }
    const result = await getUserInfo(token);

    const boardData = await developBoardService.getView(id);

    if (result.uid !== boardData.data.result.author) {
      res.redirect("/users/login");
    } else {
      const { data } = await developBoardService.postDelete(id);
      res.redirect(`./`);
    }
  } catch (e) {
    next(e);
  }
};
