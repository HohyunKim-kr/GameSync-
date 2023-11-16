const {
  DevelopBoardsRequestDTO,
  DevelopBoardsResponseDTO,
} = require("./developBoard.dto");
const { DevelopBoards } = require("../entity");
const { User } = require("../users/user.entity");

exports.createBoard = async (developBoardsRequestDTO) => {
  try {
    if (!(developBoardsRequestDTO instanceof DevelopBoardsRequestDTO)) {
      throw new Error("devDto 아닐때");
    }
    const { title, author, content, category, image, original_filename } =
      developBoardsRequestDTO;

    const developBoard = DevelopBoards.build({
      title,
      author,
      content,
      category,
      image,
      original_filename,
    });

    const response = await developBoard.save();
    const result = new DevelopBoardsResponseDTO(response);
    // console.log(`response server `, response);
    // console.log(`result server`, result);
    return result;
  } catch (e) {
    throw new Error(`SERVICE createBoard ERROR:`, e.message);
  }
};
exports.findAllBoard = async () => {
  try {
    const result = await DevelopBoards.findAll();
    console.log(`findAll result :`, result);
    return result;
  } catch (e) {
    throw new Error(`SERVICE findAllBoard ERROR: ${e.message}`);
  }
};

exports.findHitBoard = async () => {
  try {
    const result = await DevelopBoards.findAll({
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
    const result = await DevelopBoards.findAll({
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

exports.findOneBoard = async (developBoardId, isWriting) => {
  try {
    const result = await DevelopBoards.findOne({
      raw: true,
      where: {
        id: developBoardId,
      },
    });

    if (result && !isWriting) {
      await DevelopBoards.update(
        { hit: result.hit + 1 },
        { where: { id: developBoardId } }
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
      console.log("userR==========================", userResult, result);
      const data = { userResult, result };
      // console.log("a값..............", a);
      return data;
    }

    // return result;
  } catch (e) {
    throw new Error(`SERVICE findOneBoard ERROR: ${e.message}`);
  }
};
exports.updateBoard = async (developBoardId, developBoardsRequestDTO) => {
  try {
    const result = await DevelopBoards.update(
      {
        title: developBoardsRequestDTO.title,
        author: developBoardsRequestDTO.author,
        content: developBoardsRequestDTO.content,
        category: developBoardsRequestDTO.category,
        image: developBoardsRequestDTO.image,
        original_filename: developBoardsRequestDTO.original_filename,
      },
      {
        where: {
          id: developBoardId,
        },
      }
    );
    // console.log(`updateBoard result:`, result);
  } catch (e) {
    throw new Error(`SERVICE updateBoard ERROR: ${e.message}`);
  }
};
exports.deleteBoard = async (developBoardId) => {
  try {
    const result = await DevelopBoards.destroy({
      where: {
        id: developBoardId,
      },
    });
    console.log(`deleteBoard result :`, result);
    return result;
  } catch (e) {
    throw new Error(`SERVICE deleteBoard ERROR: ${e.message}`);
  }
};
