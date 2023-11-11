const UserService = require("./user.service");

const userService = new UserService();

exports.signup = async (req, res) => {
  try {
    const { user_email, user_pw, user_name } = req.body;
    const imagePath = req.file ? req.file.path : null;
    console.log(req.body);

    // UserService의 createUser 메소드를 사용하여 사용자를 생성
    const user = await userService.createUser({
      user_email,
      user_pw,
      user_name,
      user_img: imagePath,
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { user_email, user_pw } = req.body;

    const { token } = await userService.loginUser({ user_email, user_pw });

    res.json({ success: true, token });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
