const axios = require("axios");
exports.postWrite = async (tmp) => {
  try {
    const result = await axios.post("http://localhost:4000/noticeBoards/", tmp);
    return result;
  } catch (e) {
    throw new Error(`SERVICE postWrite ERROR: ${e.message}`);
  }
};
