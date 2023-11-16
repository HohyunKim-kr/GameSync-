const {
    IdeaBoardsRequestDTO,
    IdeaBoardsResponseDTO,
} = require("./ideaBoard.dto");
const { IdeaBoards } = require("../entity");
const { User } = require("../users/user.entity");

exports.createBoard = async (ideaBoardsRequestDTO) => {
    try {
        if (!(ideaBoardsRequestDTO instanceof IdeaBoardsRequestDTO)) {
            throw new Error("이상한거 넣지말래");
        }
        const { title, author, content, category, image, original_filename } =
            ideaBoardsRequestDTO;

        const ideaBoard = IdeaBoards.build({
            title,
            author,
            content,
            category,
            image,
            original_filename,
        });

        const response = await ideaBoard.save();
        console.log(`response service :`, response);

        const result = new IdeaBoardsResponseDTO(response);
        console.log(`result service :`, result);
        return result;
    } catch (e) {
        throw new Error(`SERVICE createBoard ERROR: ${e.message}`);
    }
};
exports.findAllBoard = async () => {
    try {
        const result = await IdeaBoards.findAll();
        console.log(`findAll result :`, result);
        return result;
    } catch (e) {
        throw new Error(`SERVICE findAllBoard ERROR: ${e.message}`);
    }
};

exports.findHitBoard = async () => {
    try {
        const result = await IdeaBoards.findAll({
            order: [["hit", "DESC"]],
            limit: 4,
            raw: true,
        });

        console.log(`findAll findHitBoard :`, result);
        return result;
    } catch (e) {
        throw new Error(`SERVICE findAllBoard ERROR: ${e.message}`);
    }
};

exports.findLastFour = async () => {
    try {
        const result = await IdeaBoards.findAll({
            order: [["createdAt", "DESC"]],
            limit: 4,
            raw: true,
        });

        console.log(`findAll findLastFour :`, result);
        return result;
    } catch (e) {
        throw new Error(`SERVICE findAllBoard ERROR: ${e.message}`);
    }
};
exports.findOneBoard = async (ideaBoardId, isWriting) => {
    try {
        const result = await IdeaBoards.findOne({
            raw: true,
            where: {
                id: ideaBoardId,
            },
        });

        if (result && !isWriting) {
            await IdeaBoards.update(
                { hit: result.hit + 1 },
                { where: { id: ideaBoardId } }
            );
        }
        console.log(`findOneBoard result :`, result);
        if (!result) return result;
        else {
            const userResult = await User.findOne({
                raw: true,
                where: {
                    uid: result.author,
                },
            });
            const data = { userResult, result };
            console.log("data값..............", data);
            return data;
        }
    } catch (e) {
        throw new Error(`SERVICE findOneBoard ERROR: ${e.message}`);
    }
};
exports.updateBoard = async (ideaBoardId, ideaBoardsRequestDTO) => {
    try {
        const result = await IdeaBoards.update(
            {
                title: ideaBoardsRequestDTO.title,
                author: ideaBoardsRequestDTO.author,
                content: ideaBoardsRequestDTO.content,
                category: ideaBoardsRequestDTO.category,
                image: ideaBoardsRequestDTO.image,
                original_filename: ideaBoardsRequestDTO.original_filename,
            },
            {
                where: {
                    id: ideaBoardId,
                },
            }
        );
        console.log(`updateBoard result:`, result);
        return result;
    } catch (e) {
        throw new Error(`SERVICE updateBoard ERROR: ${e.message}`);
    }
};
exports.deleteBoard = async (ideaBoardId) => {
    try {
        const result = await IdeaBoards.destroy({
            where: {
                id: ideaBoardId,
            },
        });
        console.log(`deleteBoard result :`, result);
        return result;
    } catch (e) {
        throw new Error(`SERVICE deleteBoard ERROR: ${e.message}`);
    }
};
