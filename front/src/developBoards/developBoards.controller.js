// const {
//   DevelopBoardsRequestDTO,
// } = require("../../../back/src/developBoards/developBoard.dto");
// const developBoardService = require("./developBoard.service");

// exports.list = async (req, res, next) => {
//   try {
//     res.render("developBoards/list.html");
//   } catch (e) {
//     next(e);
//   }
// };

// exports.getWrite = (req, res, next) => {
//   res.render("developBoards/write.html");
// };

// exports.postWrite = async (req, res, next) => {
//   try {
//     const developBoardsRequestDTO = new DevelopBoardsRequestDTO(req.body);
//     const result = await developBoardService.write(developBoardsRequestDTO);
//     console.log(`result postWrite :`, result);
//   } catch (e) {
//     next(e);
//   }
// };

// exports.view = async (req, res, next) => {
//   try {
//     res.render("developBoards/view.html");
//   } catch (e) {
//     next(e);
//   }
// };

// exports.modify = async (req, res, next) => {
//   try {
//     res.render("developBoards/modify.html");
//   } catch (e) {
//     next(e);
//   }
// };
