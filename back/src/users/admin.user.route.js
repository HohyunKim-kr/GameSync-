const { User } = require("./user.entity");
const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/admin", async (req, res) => {
  try {
    // admin 값이 0인 사용자들을 불러옴
    const adminUsers = await User.findAll({ where: { admin: 1 } });

    res.render("adminpage.html", { list: adminUsers });
  } catch (error) {
    console.error("Error fetching admin users:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
