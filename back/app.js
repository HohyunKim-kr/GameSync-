const express = require("express");
const { sequelize, initDB } = require("./src/entity");
const cors = require("cors");
const app = express();
const router = require("./src/route");
const cookieParser = require("cookie-parser");

// 기본 설정
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 에러 핸들링 미들웨어
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.use(router);

// 라우터 등록
// initDB().then(() => {
//   console.log("Database initialized and tables created");
//   console.log(sequelize.models);
//   app.use(router);
// });

module.exports = app;
