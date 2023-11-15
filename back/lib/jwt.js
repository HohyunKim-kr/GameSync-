const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET_KEY } = process.env;

function generateToken(user) {
  const payload = {
    uid: user.uid,
    user_email: user.user_email,
    user_name: user.user_name,
    user_img: user.user_img,
  };

  const options = { expiresIn: "7d" };

  const token = jwt.sign(payload, JWT_SECRET_KEY, options);
  jwt.decode;
  return token;
}

module.exports = { generateToken };
