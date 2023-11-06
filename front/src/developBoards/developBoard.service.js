// const axios = require("axios");

// class DevelopBoardService {
//   constructor() {
//     this.baseUrl = "http://localhost:4000/developBoards";
//   }

//   async findAll() {
//     const response = await axios.get(this.baseUrl);
//     return response.data;
//   }

//   async create(developBoard) {
//     const response = await axios.post(this.baseUrl, developBoard);
//     return response.data;
//   }

//   async findOne(id) {
//     const response = await axios.get(this.baseUrl + "/" + id);
//     return response.data;
//   }

//   async update(id, developBoard) {
//     const response = await axios.put(this.baseUrl + "/" + id, developBoard);
//     return response.data;
//   }

//   async remove(id) {
//     const response = await axios.delete(this.baseUrl + "/" + id);
//     return response.data;
//   }
// }

// module.exports = DevelopBoardService;
