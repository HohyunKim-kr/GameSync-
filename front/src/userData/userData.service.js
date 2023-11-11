// const API_URL = "http://localhost:4000";

// // 로그인 요청을 보내는 함수
// async function loginUser(user_email, user_pw) {
//   try {
//     const response = await fetch(`${API_URL}/users/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ user_email, user_pw }),
//     });

//     if (!response.ok) {
//       throw new Error("로그인에 실패했습니다.");
//     }

//     const data = await response.json();
//     return data.token; // 로그인에 성공하면 백엔드로부터 토큰을 반환
//   } catch (error) {
//     throw error;
//   }
// }

// // 회원 가입 요청을 보내는 함수
// async function signupUser(userData) {
//   try {
//     const response = await fetch(`${API_URL}/users/signup`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       throw new Error("회원 가입에 실패했습니다.");
//     }

//     const data = await response.json();
//     return data.token; // 회원 가입에 성공하면 백엔드로부터 토큰을 반환
//   } catch (error) {
//     throw error;
//   }
// }

// module.exports = {
//   loginUser,
//   signupUser,
// };
