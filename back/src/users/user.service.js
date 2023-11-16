const bcrypt = require("bcryptjs");
const { User } = require("./user.entity");
const { generateToken } = require("../../lib/jwt");
const jwt = require("jsonwebtoken");
const {
  UserCreateRequestDTO,
  UserCreateResponseDTO,
} = require("../usersDTO/user.login.dto");

class UserService {
  constructor() {}
  async createUser(userData) {
    try {
      console.log("service:", userData);

      const userDTO = new UserCreateRequestDTO(userData);

      const defaultPassword = ""; // 비밀번호 기본값 또는 클라이언트로부터 받아오기

      const hashedPassword = await bcrypt.hash(
        userDTO.user_pw || defaultPassword,
        8
      );

      console.log("hashedPassword", hashedPassword);
      const user = await User.create({
        user_email: userDTO.user_email,
        user_pw: hashedPassword,
        user_name: userDTO.user_name || "default_name",
        user_nickname: userDTO.user_nickname,
        user_img: userDTO.user_img || "default_image.jpg",
        user_birth: userDTO.user_birth || new Date(),
        k_id: userDTO.k_id || 0, // 디폴트 값 또는 클라이언트로부터 받아오기
        w_id: userDTO.w_id || "default_w_id", // 디폴트 값 또는 클라이언트로부터 받아오기
        user_provider: userDTO.user_provider || "default_locall",
      });
      console.log("Created User:", user);
      const userResponseDTO = new UserCreateResponseDTO(user);

      return userResponseDTO;
    } catch (error) {
      console.error("Error in User.create:", error);
      throw error;
    }
  }

  setCookie(res, token) {
    // console.log("res", res);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
    });
  }
  async userLogin(loginData) {
    try {
      const { user_email, user_pw } = loginData;

      console.log(user_email, user_pw);

      const user = await User.findOne({
        where: { user_email },
      });

      console.log("User테이블", User);
      if (!user) {
        throw new Error("등록되지 않은 사용자입니다");
      }

      if (user_pw) {
        const isPasswordValid = await bcrypt.compare(user_pw, user.user_pw);
        console.log("pw", user_pw, user.user_pw);
        if (!isPasswordValid) {
          throw new Error("비밀번호가 틀렸습니다");
        }
      }

      const token = generateToken({ uid: user.uid });

      //   this.setCookie(res, token);
      return { success: true, token };
    } catch (e) {
      console.log("unsuccess", e);
      return { success: false, message: e.message };
    }
  }
  async updateUser(userId, updatedFields) {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const updatedUser = await user.update(updatedFields);

      const userResponseDTO = new UserCreateResponseDTO(updatedUser);

      return userResponseDTO;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
}

module.exports = UserService;
