// const express = require("express");
// const { loginUser, signupUser } = require("./userData.service");

// const router = express.Router();

// router.post("/login", async (req, res, next) => {
//   try {
//     const { user_email, user_pw } = req.body;

//     console.log(
//       "Received login request with email:",
//       user_email,
//       "and password:",
//       user_pw
//     );

//     const token = await loginUser(user_email, user_pw);

//     // 로그인에 성공하면 토큰을 발급
//     // 이 토큰을 쿠키에 저장

//     return res.status(200).json({ token });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/signup", async (req, res, next) => {
//   try {
//     const userData = req.body;

//     const token = await signupUser(userData);

//     // 회원 가입에 성공하면 토큰을 받아올 수 있습니다.
//     // 이 토큰을 쿠키에 저장하거나 세션에 저장하여 로그인 상태를 유지할 수 있습니다.

//     return res.status(201).json({ token });
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;
