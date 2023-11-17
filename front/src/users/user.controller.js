const {
    postLogin,
    postSignup,
    kakaoLogin,
    gitLogin,
    getUserInfo,
    getUsermodify,
    postUsermodify,
    getLogout,
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

exports.getAdmin = (req, res) => {
    res.render("admin/adminpage.html");
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

        console.log("uid___________________________", uid);
        console.log("udata___________________________", userData);
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

exports.getLogout = async (req, res, next) => {
    try {
        const token = req.cookies.cookie;
        const result = await getLogout(token);
        console.log(result);
    } catch (e) {}
};
