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

const { IdeaBoards } = require("../entity");

exports.createBoard = async (dto) => {
    const responseBody = await IdeaBoards.create(dto);
    console.log(responseBody);
    // return responseBody;
};
exports.findAllBoard = async () => {};
exports.findOneBoard = async () => {};
exports.updateBoard = async () => {};
exports.deleteBoard = async () => {};
