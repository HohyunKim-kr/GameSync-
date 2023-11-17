// const adminService = require("./admin.service");
// const { getUserInfo } = require("../users/user.service");

// exports.list = async (req, res, next) => {
//   try {
//     const { data } = await adminService.getList();

//     console.log("adminList==================", data);
//     res.render("admin/list.html", { list: data });
//   } catch (e) {
//     next(e);
//   }
// };

// exports.view = async (req, res, next) => {
//   try {
//     const { id } = req.query;
//     const { data } = await adminService.getView(id);

//     if (data.result.content) {
//       data.result.content = data.result.content.replace(/\n/g, "<br>");
//     }
//     res.render("admin/adminpage.html", { data: data });
//   } catch (e) {
//     next(e);
//   }
// };

// exports.postDelete = async (req, res, next) => {
//   try {
//     const { id } = req.query;
//     const token = req.cookies.cookie;
//     if (!token) {
//       res.redirect("/users/login");
//     }

//     const result = await getUserInfo(token);

//     const boardData = await adminService.getView(id);

//     if (result.uid !== boardData.data.result.author) {
//       res.redirect("/users/login");
//     } else {
//       const { data } = await adminService.postDelete(id);
//       res.redirect(`./`);
//     }
//   } catch (e) {
//     next(e);
//   }
// };
