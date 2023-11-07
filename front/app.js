const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const router = require("./src/route");

app.set("view engine", "html");
nunjucks.configure("views", {
    express: app,
});
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(router);

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
