const noticeboardService = require("./noticeBoard.service");
const { getUserInfo } = require("../users/user.service");

// getList
exports.getList = async (req, res, next) => {
  try {
    const token = req.cookies.cookie;
    let userinfo;
    if (token) {
      userinfo = await getUserInfo(token);
    }
    const { data } = await noticeboardService.getList();
    res.render("notices/list.html", { userinfo, list: data });
  } catch (e) {
    next(e);
  }
};

// getWrite
exports.getWrite = async (req, res, next) => {
  const token = req.cookies.cookie;
  let userinfo;
  if (token) {
    userinfo = await getUserInfo(token);
  }
  res.render("notices/write.html", { userinfo });
};

// postWrite
exports.postWrite = async (req, res, next) => {
  try {
    const data = req.body;
    const file = req.file;
    const boardData = {
      title: data.title,
      author: data.author,
      content: data.content,
      image: file.filename,
      original_filename: file.originalname,
    };
    const token = req.cookies.cookie;
    if (!token) {
      res.redirect("/users/login");
    }
    console.log("notice 토큰 어딨나", token);
    const result = await noticeboardService.postWrite(boardData, token);
    const { id } = result.data;
    res.redirect(`./view?id=${id}`);
  } catch (e) {
    next(e);
  }
};

// getView
exports.getView = async (req, res, next) => {
  try {
    const token = req.cookies.cookie;
    let userinfo;
    if (token) {
      userinfo = await getUserInfo(token);
    }
    const { id } = req.query;
    const { data } = await noticeboardService.getView(id);

    if (data.result.content) {
      data.result.content = data.result.content.replace(/\n/g, "<br>");
    }
    console.log(`frontNotice view---->`, data);
    res.render("notices/view.html", { userinfo, data: data });
  } catch (e) {
    next(e);
  }
};

// postmodify
exports.getModify = async (req, res, next) => {
  try {
    const { id } = req.query;
    const token = req.cookies.cookie;
    let userinfo;
    if (token) {
      userinfo = await getUserInfo(token);
    }
    const { data } = await noticeboardService.getModify(id, token);

    if (!token) {
      res.redirect("/users/login");
    }

    const result = await getUserInfo(token);

    if (result.uid !== data.result.author) {
      res.redirect("/users/login");
    } else {
      res.render("notices/modify.html", { userinfo, data: data, id });
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
      image: file.filename,
      original_filename: file.originalname,
    };
    const token = req.cookies.cookie;
    const { result } = await noticeboardService.postModify(
      id,
      boardData,
      token
    );
    // const { id } = result.data;
    res.redirect(`./view?id=${id}`);
  } catch (e) {
    next(e);
  }
};

// post Delete
exports.postDelete = async (req, res, next) => {
  try {
    const { id } = req.query;
    const token = req.cookies.cookie;
    if (!token) {
      res.redirect("/users/login");
    }

    const result = await getUserInfo(token);

    const boardData = await noticeboardService.getView(id);

    if (result.uid !== boardData.data.result.author) {
      res.redirect("/users/login");
    } else {
      const { data } = await noticeboardService.postDelete(id);
      console.log(`postDelete controller result :`, data);
      res.redirect(`./`);
    }
  } catch (e) {
    next(e);
  }
};
