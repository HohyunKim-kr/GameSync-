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
