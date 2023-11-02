const express = require("express");
const app = express();
// const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));

const developBoardsRouter = require("./src/developBoards/route");
// const ideaBoardsRouter = require("./src/ideaBoards/route.js");

app.use(developBoardsRouter);
// app.use(ideaBoardsRouter);

module.exports = app;
