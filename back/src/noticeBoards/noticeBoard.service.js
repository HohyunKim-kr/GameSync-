const {
    NoticeBoardRequestDTO,
    NoticeBoardResponseDTO,
} = require("./noticeBoard.dto");
const { noticeBoards } = require("../entity");
const { User } = require("../users/user.entity");

exports.createBoard = async (noticeBoardRequestDTO) => {
    try {
        if (!(noticeBoardRequestDTO instanceof NoticeBoardRequestDTO)) {
            throw new Error("Create Error");
        }

        const { title, author, content, category, image, original_filename } =
            noticeBoardRequestDTO;

        const noticeBoard = await noticeBoards.build({
            title,
            author,
            content,
            category,
            image,
            original_filename,
        });

        const response = await noticeBoard.save();

        const result = new NoticeBoardResponseDTO(response);
        console.log(`result : service`, result);
        return result;
    } catch (e) {
        console.log(e);
        throw new Error(`Service createBoard err: ${e.message}`);
    }
};
exports.findAllBoard = async () => {
    try {
        const result = await noticeBoards.findAll();
        console.log("findAll result :", result);
        return result;
    } catch (e) {
        throw new Error(`SERVICE findAllBoard ERROR: ${e.message}`);
    }
};
exports.findOneBoard = async (noticeBoardId, isWriting) => {
    try {
        const result = await noticeBoards.findOne({
            raw: true,
            where: {
                id: noticeBoardId,
            },
        });

        if (result && !isWriting) {
            await noticeBoards.update(
                { hit: result.hit + 1 },
                { where: { id: noticeBoardId } }
            );
        }
        console.log("findOne result :", result);
        if (!result) return result;
        else {
            const userResult = await User.findOne({
                // raw: true,
                where: {
                    uid: result.author,
                },
            });
            const data = { userResult, result };
            console.log("data값..............", data);
            return data;
        }
    } catch (e) {
        console.log(e);
        throw new Error(`SERVICE findOneBoard ERROR: ${e.message}`);
    }
};
exports.updateBoard = async (noticeBoardId, noticeBoardRequestDTO) => {
    try {
        const result = await noticeBoards.update(
            {
                title: noticeBoardRequestDTO.title,
                content: noticeBoardRequestDTO.content,
                image: noticeBoardRequestDTO.image,
                original_filename: noticeBoardRequestDTO.original_filename,
                // category: noticeBoardRequestDTO.category,
                // img: noticeBoardRequestDTO.img,
            },
            {
                where: {
                    id: noticeBoardId,
                },
            }
        );
    } catch (e) {
        throw new Error(`SERVICE updateBoard ERROR: ${e.message}`);
    }
};
exports.deleteBoard = async (noticeBoardId) => {
    try {
        const result = await noticeBoards.destroy({
            where: {
                id: noticeBoardId,
            },
        });
        console.log(`deleteBoard result :`, result);
        return result;
    } catch (e) {
        throw new Error(`SERVICE deleteBoard ERROR: ${e.message}`);
    }
};
