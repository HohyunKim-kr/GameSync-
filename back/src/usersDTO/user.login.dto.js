const BaseDTO = require("../dto");

class UserCreateRequestDTO extends BaseDTO {
  user_email;
  user_pw;
  user_name;
  user_nickname;
  user_img;
  user_birth;
  // user_provider;
  original_filename;

  constructor(body, header) {
    super();

    console.log(body);
    console.log(header);

    this.user_email = body.user_email;
    this.user_pw = body.user_pw;
    this.user_name = body.user_name;
    this.user_nickname = body.user_nickname;
    this.user_birth = body.user_birth;
    this.user_img = body.user_img;
    // this.user_provider = body.user_provider;
    this.original_filename = body.user_img;
    this.provider = body.provider || "local"; // 기본값으로 'local'을 할당합니다.

    this.validate(this);
  }
}

class UserCreateResponseDTO extends BaseDTO {
  uid;
  user_email;
  user_name;
  user_nickname;
  user_img;
  user_provider;
  original_filename;
  created_at;
  //   updated_at;

  constructor(userModelInstance) {
    super();
    this.uid = userModelInstance.uid;
    this.user_email = userModelInstance.user_email;
    this.user_name = userModelInstance.user_name;
    this.user_nickname = userModelInstance.user_nickname;
    this.user_img = userModelInstance.user_img;
    this.user_provider = userModelInstance.user_provider;
    this.created_at = this.toDate(userModelInstance.createdAt);
    this.original_filename = userModelInstance.original_filename;
    // this.updated_at = this.toDate(userModelInstance.updatedAt);

    this.validate(this);
  }
}

module.exports = {
  UserCreateRequestDTO,
  UserCreateResponseDTO,
};
