const API_URL = "http://localhost:4000";
const axios = require("axios");

require("dotenv").config();

const REST_API_KEY = process.env.REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

// 로그인 요청을 보내는 함수
async function postLogin(user_email, user_pw) {
    try {
        const { data: response } = await axios.post(
            `${API_URL}/users/login`,
            {
                user_email,
                user_pw,
            },
            {}
        );

        // console.log(response);

        if (!response.success) {
            throw new Error("로그인에 실패했습니다.");
        }

        return response.token; // 로그인에 성공하면 백엔드로부터 토큰을 반환
    } catch (error) {
        throw error;
    }
}

// 회원 가입 요청을 보내는 함수
async function postSignup(userData) {
    try {
        const response = await axios.post(`${API_URL}/users/signup`, userData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data.token;
    } catch (error) {
        throw error;
    }
}

async function kakaoLogin(code) {
    try {
        const host = "https://kauth.kakao.com/oauth/token";
        const body = `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`;
        const respones = await axios.post(host, body, {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        });
        // console.log(respones);
        const {
            data: { access_token },
        } = respones;
        // console.log(access_token);

        const userinfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
                "Content-type":
                    "application/x-www-form-urlencoded;charset=utf-8",
                Authorization: `Bearer ${access_token}`,
            },
        });
        // console.log(userinfo);

        const {
            data: { id },
        } = userinfo;
        const { nickname } = userinfo.data.properties;
        const { email } = userinfo.data.kakao_account;

        // console.log(id, email, nickname);
        const token = await axios.post(`${API_URL}/users/kakao`, {
            id,
            nickname,
            email,
            provider: "kakao",
        });
        // console.log(token);
        return token;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    postLogin,
    postSignup,
    kakaoLogin,
};
