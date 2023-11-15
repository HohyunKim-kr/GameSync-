const axios = require("axios");

exports.getList = async () => {
  try {
    const result = await axios.get("http://localhost:4000/developBoards/");
    // console.log("result ==================================", result);
    return result;
  } catch (e) {
    throw new Error(`SERVICE getList ERROR: ${e.message}`);
  }
};

exports.postWrite = async (boardData, token) => {
  try {
    const authorization = token;
    // console.log("어서==================", authorization);
    const result = await axios.post(
      "http://localhost:4000/developBoards/",
      boardData,
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      }
    );

    return result;
  } catch (e) {
    throw new Error(`SERVICE getList ERROR: ${e.message}`);
  }
};

exports.getView = async (id) => {
  try {
    const result = await axios.get(`http://localhost:4000/developBoards/${id}`);
    return result;
  } catch (e) {
    throw new Error(`SERVICE getView ERROR: ${e.message}`);
  }
};

exports.getModify = async (id) => {
  try {
    const result = await axios.get(`http://localhost:4000/developBoards/${id}`);
    return result;
  } catch (e) {
    throw new Error(`SERVICE getModify ERROR: ${e.message}`);
  }
};

exports.putModify = async (id, boardData) => {
  try {
    console.log(boardData);
    const result = await axios.put(
      `http://localhost:4000/developBoards/${id}`,
      boardData
    );
    console.log(result);
    return result;
  } catch (e) {
    throw new Error(`SERVICE putModify ERROR: ${e.message}`);
  }
};

exports.postDelete = async (id) => {
  try {
    const result = await axios.delete(
      `http://localhost:4000/developBoards/${id}`
    );
    return result;
  } catch (e) {
    throw new Error(`SERVICE postDelete ERROR: ${e.message}`);
  }
};
