const axios = require("axios");

class DevelopBoardsService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getList() {
    try {
      const result = await axios.get(this.baseUrl);
      return result.data;
    } catch (e) {
      throw new Error(`DevelopSERVICE getList ERROR: ${e.message}`);
    }
  }

  async postWrite(boardData) {
    try {
      const result = await axios.post(this.baseUrl, boardData);
      return result.data;
    } catch (e) {
      throw new Error(`DevelopSERVICE postWrite ERROR: ${e.message}`);
    }
  }

  async getView(id) {
    try {
      const result = await axios.get(`${this.baseUrl}/${id}`);
      return result.data;
    } catch (e) {
      throw new Error(`DevelopSERVICE getView ERROR: ${e.message}`);
    }
  }
}

module.exports = DevelopBoardsService;
