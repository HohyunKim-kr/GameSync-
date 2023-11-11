const bcrypt = require("bcryptjs");
const { User } = require("./user.entity");
const { generateToken } = require("../../lib/jwt");
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

      const hashedPassword = await bcrypt.hash(userDTO.password, 8);

      const user = await User.create({
        user_email: userDTO.user_email,
        password: hashedPassword,
        user_name: userDTO.user_name,
        user_img: userDTO.user_img,
        user_provider: userDTO.user_provider,
      });

      const userResponseDTO = new UserCreateResponseDTO(user);

      return userResponseDTO;
    } catch (error) {
      throw error;
    }
  }
  async loginUser(loginData) {
    try {
      const { user_email, user_pw } = loginData;

      const user = await User.findOne({
        where: { user_email },
      });

      if (!user) {
        throw new Error("등록되지 않은 사용자입니다");
      }

      const isPasswordValid = await bcrypt.compare(user_pw, user.user_pw);

      if (!isPasswordValid) {
        throw new Error("비밀번호가 틀렸습니다");
      }

      const token = generateToken({ uid: user.uid });

      return { token };
    } catch (e) {
      throw e.message;
    }
  }
}

module.exports = UserService;
