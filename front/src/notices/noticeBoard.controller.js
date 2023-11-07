const {
  NoticeBoardRequestDTO,
} = require("../../../back/src/noticeBoards/noticeBoard.dto");
const noticeboardService = require("./noticeBoard.service");

exports.write = async (req, res, next) => {
  try {
    const tmp = {};
    tmp["title"] = req.body.title;
    tmp["content"] = req.body.content;
    tmp["author"] = req.body.author;
    tmp["date"] = Date.now();
    tmp["hit"] = 1;
    tmp["category"] = 1;
    tmp["img"] = "ASda";
    tmp["like"] = 1;
    tmp["createdAt"] = Date.now();
    tmp["updatedAt"] = Date.now();
    const response = await noticeboardService.postWrite(tmp);
    console.log(response);
  } catch (e) {
    next(e);
  }
};

// exports.list = async (req, res, next) => {
//   try {
//     // const data = req.body;
//     // const noticeBoardRequestDTO = NoticeBoardRequestDTO;
//     const response = await noticeboardService.getList();
//     // res.render("",{response})
//   } catch (e) {
//     next(e);
//   }
// };

// exports.view = async (req, res, next) => {
//   try {
//     // const data = req.body;
//     const response = await noticeboardService.getView();
//   } catch (e) {
//     next(e);
//   }
// };

// exports.modify = async () => {
//   try {
//     const response = await noticeboardService.postModify();
//   } catch (e) {
//     next(e);
//   }
// };
