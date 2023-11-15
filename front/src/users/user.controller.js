const {
    postLogin,
    postSignup,
    kakaoLogin,
    gitLogin,
    getUserInfo,
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

exports.getUserPage = (req, res) => {
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
exports.getUserInfo = async (req, res, next) => {
    try {
        const token = req.cookies.cookie;

        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }

        const userInfo = await getUserInfo(token);

        // console.log("userInfo", userInfo);

        res.status(200).json(userInfo);
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
        // console.log(`code:`, code);
        const result = await kakaoLogin(code);
        // console.log(`넘어와!!!:`, result.data.user);
        // console.log(`넘어와!!!:`, result.data.token);
        const { token } = result.data;
        if (token) {
            res.cookie("cookie", token);

            return res.redirect("/");

            // return res.status(200).json({ token });
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
