const API_URL = "http://localhost:4000";
const axios = require("axios");

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

    console.log(response);

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

module.exports = {
  postLogin,
  postSignup,
};
