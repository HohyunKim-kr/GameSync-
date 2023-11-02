const boardService = require("./board.service");

exports.getList = async (req, res, next) => {
  try {
    const result = await boardService.getFindAll();
    res.render("views/deveMain.html", {
      list: result,
    });
  } catch (e) {
    next(e);
  }
};

exports.getView = async (req, res, next) => {
  try {
    const { id } = req.query;
    const result = await boardService.getFindOne(id);
    console.log(result);
    res.render("views/view.html", {
      data: result,
    });
  } catch (e) {
    next(e);
  }
};
