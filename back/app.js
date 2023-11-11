const express = require("express");
const { sequelize, initDB } = require("./src/entity");
const cors = require("cors");
const app = express();
const router = require("./src/route");

// 기본 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(router);
initDB().then(() => {
  console.log("Database initialized and tables created");

  app.use(router);
});

// 에러 핸들링 미들웨어
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

module.exports = app;
