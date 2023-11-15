const developBoardService = require("./developBoard.service");

exports.list = async (req, res, next) => {
  try {
    const { data } = await developBoardService.getList();
    // console.log(`list controller result:`, data);
    // console.log("req+++++++++++++++++++++++++++++++++++++++", req.user);
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
    // console.log("토큰 =====================", token);
    // console.log(req.headers);
    // console.log(req.file); // 객체 출력
    const result = await developBoardService.postWrite(boardData, token);
    // console.log(`postWite controller result:`, result);
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
    // console.log(data.image);
    console.log("daa값===============", data);
    // data.content = data.content.replace(/\n/g, "<br>");
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
    const { data } = await developBoardService.getModify(id);

    res.render("developBoards/modify.html", { data: data, id });
  } catch (e) {
    next(e);
  }
};

exports.postModify = async (req, res, next) => {
  try {
    const { id } = req.query;
    console.log(id);

    const data = req.body;

    console.log(req.file);
    const file = req.file;

    const boardData = {
      title: data.title,
      author: data.author,
      content: data.content,
      category: data.category,
      image: file.filename,
      original_filename: file.originalname,
    };

    console.log(`front modify`, boardData, id);
    const { result } = await developBoardService.putModify(id, boardData);
    console.log(`postWrite controller result :`, result);

    res.redirect(`./view?id=${id}`);
  } catch (e) {
    next(e);
  }
};

exports.postDelete = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { data } = await developBoardService.postDelete(id);
    // console.log(`postDelete controller result :`, data);
    res.redirect(`./`);
  } catch (e) {
    next(e);
  }
};
