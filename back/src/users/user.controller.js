const UserService = require("./user.service");
const { User } = require("./user.entity");
const userService = new UserService();
const jwt = require("jsonwebtoken");
const { UserCreateRequestDTO } = require("../usersDTO/user.login.dto");
require("dotenv").config();
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
    const { uid, user_email, user_nickname, user_provider, admin } = req.body;

    const { token } = await userService.userLogin({
      uid,
      user_email,
      user_nickname,
      user_provider,
      admin,
      res,
    });

    // console.log({ success: true, token });

    res.json({ success: true, token });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

exports.verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // 예시: Bearer 토큰값

  // 토큰에서 payload를 해석하여 관리자 권한인지 확인
  const decoded = jwt.verify(token, secretKey);
  if (decoded.admin !== 1) {
    return res
      .status(403)
      .json({ success: false, message: "관리자 권한이 없습니다." });
  }

  // 관리자라면 다음 미들웨어로 전달
  next();
};

exports.getUserModify = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log("userId______________________", userId);
    const userCreateRequestDTO = new UserCreateRequestDTO(req.body, req.file);

    const response = await userService.updateUser(userId, userCreateRequestDTO);

    console.log("Usercontroller---------------------", response);
    res.status(200).json(response); // 업데이트된 사용자 정보를 반환
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.postUserModify = async (req, res, next) => {
  try {
    console.log("@@@@@@@", req.body);
    const uid = req.headers.authorization;
    console.log(uid);
    const token = uid.split("Bearer ")[1];

    let userId;
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      userId = decoded.uid;
    });

    const userCreateRequestDTO = new UserCreateRequestDTO(
      req.body,
      req.headers
    );
    const response = await userService.updateUser(userId, userCreateRequestDTO);
    res.status(201).json(response);
  } catch (e) {
    next(e);
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
exports.getUserInfo = async (req, res) => {
  try {
    const tokenInfo = req.headers.authorization;

    const token = tokenInfo.split("Bearer ")[1];
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      async function (err, decoded) {
        const uid = decoded.uid;
        const user = await User.findOne({
          where: {
            uid: uid,
          },
        });

        // console.log("user--------------", user);
        // console.log("jwt.verify===============", decoded.uid, req.body);
        delete user.dataValues.user_pw;
        res.status(201).json(user.dataValues);
      }
    );
  } catch (e) {
    console.log(e);
  }
};

exports.getLogout = async (req, res, next) => {
  try {
    const userId = req.params;
    console.log(`22222222222`, req.params);
    console.log(`userid 내나--->`, userId);
    const result = await userService.logout(userId);
    console.log(`back logout--->`, result);

    // res.clearCookie("token");
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};
