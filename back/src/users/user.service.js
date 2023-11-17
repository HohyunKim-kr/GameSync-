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
                const isPasswordValid = await bcrypt.compare(
                    user_pw,
                    user.user_pw
                );
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
    async updateUser(userId, userCreateRequestDTO) {
        try {
            console.log("# ", userCreateRequestDTO);
            const { result } = await User.update(
                {
                    uid: userCreateRequestDTO.uid,
                    user_email: userCreateRequestDTO.user_email,
                    user_name: userCreateRequestDTO.user_name,
                    user_nickname: userCreateRequestDTO.user_nickname,
                    user_pw: userCreateRequestDTO.user_pw,
                    user_birth: userCreateRequestDTO.user_birth,
                    user_img: userCreateRequestDTO.user_img,
                    original_filename: userCreateRequestDTO.original_filename,
                },
                {
                    where: {
                        uid: userId,
                    },
                }
            );
            console.log(`upDate user---------- result:`, result);
            return result;
        } catch (error) {
            console.log("%%% ", error);
            console.error("Error updating user:", error);
            throw error;
        }
    }

    async logout(userId) {
        try {
            console.log(`ddddd`, userId);
            const id = userId.uid;
            console.log(userId.uid);

            const user = await User.findOne({ where: { uid: id } });
            console.log(`user----->`, user);
            return;
            // if (user.token !== null) {
            //     // 기존에 토큰이 설정된 경우에만 토큰을 null로 설정
            //     user.token = null;
            //     await user.save();
            //     return "Logout successful";
            // } else {
            //     throw new Error("Unauthorized: User has no active session"); // 이미 로그아웃된 경우에 대한 오류 메시지
            // }
        } catch (error) {
            console.log("%%% ", error);
            console.error("Error logout user:", error);
            throw error;
        }
    }
}

module.exports = UserService;
