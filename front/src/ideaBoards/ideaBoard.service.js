const axios = require("axios");

exports.getList = async () => {
    try {
        const result = await axios.get("http://localhost:4000/ideaBoards/");
        console.log(result);
        return result;
    } catch (e) {
        throw new Error(`SERVICE getList ERROR: ${e.message}`);
    }
};

exports.postWrite = async (boardData) => {
    try {
        const result = await axios.post(
            "http://localhost:4000/ideaBoards/",
            boardData
        );
        console.log(result);
        return result;
    } catch (e) {
        throw new Error(`SERVICE postWrite ERROR: ${e.message}`);
    }
};

exports.getView = async (id) => {
    try {
        const result = await axios.get(
            `http://localhost:4000/ideaBoards/${id}`
        );
        return result;
    } catch (e) {
        throw new Error(`SERVICE getView ERROR: ${e.message}`);
    }
};

exports.getModify = async (id) => {
    try {
        const result = await axios.get(
            `http://localhost:4000/ideaBoards/${id}`
        );
        return result;
    } catch (e) {
        throw new Error(`SERVICE getModify ERROR: ${e.message}`);
    }
};

exports.putModify = async (boardData, id) => {
    try {
        const result = await axios.put(
            `http://localhost:4000/ideaBoards/${id}`,
            boardData
        );
        return result;
    } catch (e) {
        throw new Error(`SERVICE putModify ERROR: ${e.message}`);
    }
};

exports.postDelete = async (id) => {
    try {
        const result = await axios.delete(
            `http://localhost:4000/ideaBoards/${id}`
        );
        return result;
    } catch (e) {
        throw new Error(`SERVICE putModify ERROR: ${e.message}`);
    }
};
