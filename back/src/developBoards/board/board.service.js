const boardRepository = require("./board.repository");
exports.getFindAll = async () => {
  try {
    const result = await boardRepository.findAll();
    return result;
  } catch (e) {
    throw new Error(`getFindAll 함수오류 ${e.message} `);
  }
};

exports.getFindOne = async (board_id) => {
  try {
    // const id = parseInt(board_id);
    const [result] = await boardRepository.findOne(board_id);
    console.log(result);
    return result;
  } catch (e) {
    throw new Error(`getFindOne 함수오류 ${e.message} `);
  }
};
