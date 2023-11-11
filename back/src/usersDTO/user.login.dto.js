const BaseDTO = require("../dto");

class UserCreateRequestDTO extends BaseDTO {
  user_email;
  user_pw;
  user_name;
  user_img;
  user_provider;

  constructor(body) {
    super();
    this.user_email = body.user_email;
    this.user_pw = body.user_pw;
    this.user_name = body.user_name;
    this.user_provider = body.user_provider;
    this.provider = body.provider || "local"; // 기본값으로 'local'을 할당합니다.

    // this.validate(this); // 생성된 객체를 검증합니다.
  }
}

class UserCreateResponseDTO extends BaseDTO {
  uid;
  user_email;
  user_name;
  user_img;
  user_provider;
  //   created_at;
  //   updated_at;

  constructor(userModelInstance) {
    super();
    this.uid = userModelInstance.uid;
    this.user_email = userModelInstance.user_email;
    this.user_name = userModelInstance.user_name;
    this.user_img = userModelInstance.user_img;
    this.user_provider = userModelInstance.user_provider;
    // this.created_at = this.toDate(userModelInstance.createdAt);
    // this.updated_at = this.toDate(userModelInstance.updatedAt);

    this.validate(this);
  }
}

module.exports = {
  UserCreateRequestDTO,
  UserCreateResponseDTO,
};
