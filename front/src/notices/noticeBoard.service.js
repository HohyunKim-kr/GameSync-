const axios = require("axios");

exports.getList = async () => {
  try {
    const result = await axios.get("http://localhost:4000/noticeBoards/");
    return result;
  } catch (e) {
    throw new Error(`SERVICE postWrite ERROR: ${e.message}`);
  }
};

exports.postWrite = async (boardData, token) => {
  try {
    const authorization = token;
    const result = await axios.post(
      "http://localhost:4000/noticeBoards/",
      boardData,
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      }
    );
    return result;
  } catch (e) {
    throw new Error(`SERVICE postWrite ERROR: ${e.message}`);
  }
};

exports.getView = async (id) => {
  try {
    const result = await axios.get(`http://localhost:4000/noticeBoards/${id}`);
    return result;
  } catch (e) {
    throw new Error(`SERVICE getView ERROR: ${e.message}`);
  }
};

exports.getModify = async (id) => {
  try {
    const result = await axios.get(`http://localhost:4000/noticeBoards/${id}`);
    return result;
  } catch (e) {
    throw new Error(`SERVICE getModify ERROR: ${e.message}`);
  }
};

exports.postModify = async (id, boardData) => {
  try {
    const result = await axios.put(
      `http://localhost:4000/noticeBoards/${id}`,
      boardData
    );

    console.log("1234", result);

    return result;
  } catch (e) {
    throw new Error(`SERVICE postModify ERROR: ${e.message}`);
  }
};

exports.postDelete = async (id) => {
  try {
    const result = await axios.delete(
      `http://localhost:4000/noticeBoards/${id}`
    );
    return result;
  } catch (e) {
    throw new Error(`SERVICE postDelete ERROR: ${e.message}`);
  }
};
