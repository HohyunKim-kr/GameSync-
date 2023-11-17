const { User } = require("./user.entity");
const UserService = require("./user.service");
const userService = new UserService();
const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/admin", async (req, res) => {
  try {
    // admin 값이 0인 사용자들을 불러옴
    const response = await userService.findAll();
    res.status(201).json(response);
  } catch (error) {
    console.error("Error fetching admin users:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
