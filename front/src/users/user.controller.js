const { postLogin, postSignup } = require("./user.service");

exports.getLogin = (req, res) => {
  res.render("users/login.html");
};

exports.getSignup = (req, res) => {
  res.render("users/signup.html");
};

exports.getUser = (req, res) => {
  res.render("users/mypage.html");
};

exports.getAdmin = (req, res) => {
  res.render("admin/adminpage.html");
};

exports.getUsermodify = (req, res) => {
  res.render("users/mypage.modify.html");
};

exports.postLogin = async (req, res, next) => {
  try {
    const { user_email, user_pw } = req.body;
    const token = await postLogin(user_email, user_pw);

    if (token) {
      res.cookie("cookie", token);

      return res.redirect("/");

      // return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Post Login failed" });
    }
  } catch (error) {
    next(error);
  }
};

exports.postSignup = async (req, res, next) => {
  try {
    const userData = req.body;
    const token = await postSignup(userData);
    return res
      .status(201)
      .redirect("http://localhost:3000/users/login?success=true");
  } catch (error) {
    next(error);
  }
};
