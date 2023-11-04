// class IdeaService {
//     constructor(IdeaBoards) {
//         this.IdeaBoards = IdeaBoards;
//     }
//     async createBoard(dto) {
//         const responseBody = await this.IdeaBoards.create(dto);
//         return responseBody;
//     }
// }

// module.exports = IdeaService;
const {
  NoticeBoardRequestDTO,
  NoticeBoardResponseDTO,
} = require("./noticeBoard.dto");
const { noticeBoards } = require("../entity");

exports.createBoard = async (noticeBoardRequestDTO) => {
  try {
    if (!(noticeBoardRequestDTO instanceof NoticeBoardRequestDTO)) {
      throw new Error("Create Error");
    }
    const { id, title, author, content, hit, category, img, likeCount } =
      noticeBoardRequestDTO;

    const noticeBoard = await noticeBoards.build({
      id,
      title,
      author,
      content,
      hit,
      category,
      img,
      likeCount,
    });

    const response = await noticeBoard.save();

    const result = new NoticeBoardResponseDTO(response);
    console.log(`result : service`, result);
    return result;
  } catch (e) {
    throw new Error(`Service createBoard err: ${e.message}`);
  }
};
// exports.findAllBoard = async () => {
//   try {
//   } catch (e) {}
// };
// exports.findOneBoard = async () => {
//   try {
//   } catch (e) {}
// };
// exports.updateBoard = async () => {
//   try {
//   } catch (e) {}
// };
// exports.dleteBoard = async () => {
//   try {
//   } catch (e) {}
// };
