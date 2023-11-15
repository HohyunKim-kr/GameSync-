const UserService = require("./user.service");

const userService = new UserService();

exports.signup = async (req, res) => {
  try {
    const { user_email, user_pw, user_name, user_nickname } = req.body;
    const imagePath = req.file ? req.file.path : null;
    console.log(req.body);

    // UserService의 createUser 메소드를 사용하여 사용자를 생성
    const user = await userService.createUser({
      user_email,
      user_pw,
      user_name,
      user_nickname,
      user_img: imagePath,
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { uid, user_email, user_nickname, user_provider } = req.body;

    const { token } = await userService.userLogin({
      uid,
      user_email,
      user_nickname,
      user_provider,
      res,
    });

    console.log({ success: true, token });

    res.json({ success: true, token });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

exports.kakaoLogin = async (req, res, next) => {
  try {
    const loginDTO = req.body;

    const user = await userService.createUser({
      k_id: loginDTO.id,
      user_nickname: loginDTO.nickname,
      user_email: loginDTO.email,
      user_provider: loginDTO.provider,
    });

    const { token } = await userService.userLogin({
      user_email: loginDTO.email,
    });

    res.status(201).json({ user, token });
  } catch (e) {
    next(e);
  }
};

exports.gitLogin = async (req, res, next) => {
  try {
    const loginDTO = req.body;
    console.log(loginDTO);

    const user = await userService.createUser({
      g_id: loginDTO.id,
      user_nickname: loginDTO.nickname,
      user_email: loginDTO.email,
      user_provider: loginDTO.provider,
    });

    const { token } = await userService.userLogin({
      user_email: loginDTO.email,
    });

    res.status(201).json({ user, token });
  } catch (e) {
    next(e);
  }
};
