// const axios = require("axios");

// exports.getList = async () => {
//   try {
//     const result = await axios.get(`http://localhost:4000/admin//${id}`);
//     return result;
//   } catch (e) {
//     throw new Error(`SERVICE getList ERROR: ${e.message}`);
//   }
// };

// exports.getView = async (id) => {
//   try {
//     const result = await axios.get(`http://localhost:4000/admin/${id}`);
//     return result;
//   } catch (e) {
//     throw new Error(`SERVICE getView ERROR: ${e.message}`);
//   }
// };

// exports.postDelete = async (id, token) => {
//   try {
//     const authorization = token;
//     const result = await axios.delete(`http://localhost:4000/admin/${id}`, {
//       headers: {
//         Authorization: `Bearer ${authorization}`,
//       },
//     });
//     console.log("admin________result");
//     return result;
//   } catch (e) {
//     throw new Error(`SERVICE putModify ERROR: ${e.message}`);
//   }
// };
