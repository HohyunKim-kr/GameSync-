// const { loginUser, signupUser } = require("./userData.service");

// class UserDataController {
//   async getLogin(req, res, next) {
//     try {
//       const provider = req.params.provider;
//       //   let redirectURI;

//       if (provider === "login") {
//         // 여기에서 로그인 페이지를 보여주는 코드를 추가
//         // 예를 들어, 로그인 폼이 있는 HTML 페이지를 렌더링하거나 프론트엔드 라우터를 이용해 로그인 페이지로 이동
//         return res.render("users/login.html", {});
//       }
//     } catch (e) {
//       next(e);
//     }
//   }

//   async postLogin(req, res, next) {
//     try {
//       const { user_email, user_pw } = req.body;

//       // 여기에서 실제로는 DB에서 사용자 정보를 확인하고, 비밀번호를 검증하는 로직을 구현
//       const token = await loginUser(user_email, user_pw);

//       if (token) {
//         return res.status(200).json({ token });
//       } else {
//         return res.status(401).json({ message: "Login failed" });
//       }
//     } catch (error) {
//       next(error);
//     }
//   }

//   async postSignup(req, res, next) {
//     try {
//       const userData = req.body;

//       // 회원 가입 API 호출
//       const token = await signupUser(userData);

//       return res.status(201).json({ token });
//     } catch (error) {
//       next(error);
//     }
//   }
// }

// module.exports = UserDataController;
