const { IdeaBoardsRequestDTO } = require("./ideaBoard.dto");
const { IdeaBoards } = require("../entity");

exports.createBoard = async (ideaBoardsRequestDTO) => {
    try {
        if (!(ideaBoardsRequestDTO instanceof IdeaBoardsRequestDTO)) {
            throw new Error("이상한거 넣지말래");
        }
        const { title, author, content } = ideaBoardsRequestDTO;

        const ideaBoard = IdeaBoards.build({
            title,
            author,
            content,
        });
        // console.log(ideaBoard);
        const response = await ideaBoard.save();
        console.log(`response service `, response);
        // const result = await IdeaBoards.create(IdeaBoardsRequestDTO);
        // return result;
    } catch (e) {
        throw new Error(`SERVICE createBoard ERROR:`, e.message);
    }
};
exports.findAllBoard = async () => {};
exports.findOneBoard = async () => {};
exports.updateBoard = async () => {};
exports.deleteBoard = async () => {};
