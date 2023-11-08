const express = require("express");
const app = express();

const cors = require("cors");
const router = require("./src/route");

app.use(cors());
app.use(express.json());
app.use(router);
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

module.exports = app;
