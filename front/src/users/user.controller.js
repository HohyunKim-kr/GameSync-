const {
  postLogin,
  postSignup,
  kakaoLogin,
  gitLogin,
  getUserInfo,
  getUsermodify,
  postUsermodify,
  getLogout,
  admin,
} = require("./user.service");
require("dotenv").config();

const REST_API_KEY = process.env.REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
const GIT_REST_API_KEY = process.env.GIT_REST_API_KEY;
const GIT_REDIRECT_URI = process.env.GIT_REDIRECT_URI;

exports.getLogin = (req, res) => {
  res.render("users/login.html");
};

exports.getSignup = (req, res) => {
  res.render("users/signup.html");
};

exports.getUserPage = async (req, res) => {
  const token = req.cookies.cookie;
  let userinfo;
  if (token) {
    userinfo = await getUserInfo(token);
  }
  res.render("users/mypage.html", { userinfo });
  // res.render("users/mypage.html");
};

exports.getAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.cookie;

    const userinfo = await getUserInfo(token);

    if (!token || !userinfo) {
      return res.redirect("/login");
    }

    if (userinfo.admin === 1) {
      const { data } = await admin();
      // console.log(`내나---->`, data);
      return res.render("admin/adminpage.html", { userinfo, list: data });
    } else {
      return res.status(403).send(`
      <script>
        alert('접근 권한이 없습니다.');
        window.location.href = "/";
      </script>
    `);
    }

  } catch (e) {
    next(e);
  }
};

exports.getUsermodify = async (req, res) => {
  const { uid } = req.query;
  const token = req.cookies.cookie;
  let userinfo;
  if (token) {
    userinfo = await getUserInfo(token);
  }
  const { data } = await getUsermodify(uid, token);

  if (!token) {
    res.redirect("/users/login");
  }


  // if (result.uid !== data.result.author) {
  //   res.redirect("/users/login");
  // } else {
  //   res.render("/user/modify.html", { userinfo, data: data, uid });
  // }
  // console.log("userinfo-------", userinfo);
  res.render("users/mypage.modify.html", { userinfo, data: data });
  // res.render("users/mypage.modify.html", { userinfo });

};

exports.postLogin = async (req, res, next) => {
  try {
    const { user_email, user_pw } = req.body;
    const token = await postLogin(user_email, user_pw);

    if (token) {
      res.cookie("cookie", token);
      console.log("token 형식==================", token);
      return res.redirect(`/`);

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
    return res.status(201).redirect("http://localhost:3000/users/login");
  } catch (error) {
    next(error);
  }
};
exports.getUserInfo = async (req, res, next) => {
  try {
    const token = req.cookies.cookie;
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
    const userInfo = await getUserInfo(token);
    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};

exports.postUsermodify = async (req, res, next) => {
  try {
    const { uid } = req.query;
    const data = req.body;

    const userData = {
      user_email: data.user_email,
      user_pw: data.user_pw,
      user_name: data.user_name,
      user_nickname: data.user_nickname,
      user_birth: data.user_birth,
      user_img: req.file.filename,
    };

    const token = req.cookies.cookie;

    const result = await postUsermodify(uid, userData, token);
    return res.status(201).redirect(`/users/user`);
  } catch (error) {
    next(error);
  }
};

exports.kakaoLogin = (req, res, next) => {
  try {
    const redirectURI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    res.redirect(redirectURI);
  } catch (e) {
    next(e);
  }
};

exports.kakaoCallback = async (req, res, next) => {
  try {
    const { code } = req.query;


    const result = await kakaoLogin(code);

    const { token } = result.data;
    if (token) {
      res.cookie("cookie", token);

      return res.redirect("/");

    } else {
      return res.status(401).json({ message: "kakao Login failed" });
    }
  } catch (e) {
    next(e);
  }
};

exports.gitLogin = (req, res, next) => {
  try {
    const redirectURI = `https://github.com/login/oauth/authorize?client_id=${GIT_REST_API_KEY}`;
    // const redirectURI = ` https://github.com/login/oauth/authorize?client_id=${GIT_REST_API_KEY}&redirect_uri=${GIT_REDIRECT_URI}&response_type=code`;
    // const redirectURI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    res.redirect(redirectURI);
  } catch (e) {
    next(e);
  }
};

exports.gitCallback = async (req, res, next) => {
  try {
    const { code } = req.query;

    const result = await gitLogin(code);
    const { token } = result.data;
    // console.log(`넘어와!!!:`, result.data.user);
    // console.log(`넘어와!!!:`, result.data.token);
    if (token) {
      res.cookie("cookie", token);
      return res.redirect("/");
    } else {
      return res.status(401).json({ message: "git Login failed" });
    }
  } catch (e) {
    next(e);
  }
};

exports.getLogout = async (req, res, next) => {
  try {
    const token = req.cookies.cookie;
    let userinfo;
    if (token) {
      userinfo = await getUserInfo(token);
    }
    // const { uid } = req.query;

    // console.log(`uid내나--->`, userinfo.uid);
    const uid = userinfo.uid;

    const result = await getLogout(uid);
    // console.log(result);
    console.log(" 토큰삭제", token);
    res.clearCookie("cookie", { httpOnly: true }).redirect("/");

    // res.status(201).json("Logout successful");
  } catch (e) {
    next(e);
  }
};
