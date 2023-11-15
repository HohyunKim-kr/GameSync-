const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const router = require("./src/route");
const { auth } = require("./src/authMiddle");
const cookieParser = require("cookie-parser");

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
});
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("uploads"));

app.use(router);
app.use(auth);

// app.get("/ideaBoards/", (req, res) => {
//     res.render("ideaBoards/ideaBoard.list.html");
// });

// app.get("/ideaBoards/write", (req, res) => {
//     res.render("ideaBoards/ideaBoard.write.html");
// });

// app.get("/ideaBoards/view", (req, res) => {
//     res.render("ideaBoards/ideaBoard.view.html");
// });

// app.get("/ideaBoards/modify", (req, res) => {
//     res.render("ideaBoards/ideaBoard.modify.html");
// });

module.exports = app;
