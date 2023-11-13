const { User } = require("./user.entity");

// test
const testData = [
  {
    user_email: "test@example.com",
    user_name: "Test User",
    user_pw: "hashedpassword",
    user_birth: "1990-01-01",
    user_img: "/images/test.jpg",
    k_id: 123,
    w_id: "test_w_id",
    user_provider: "local",
    admin: 0,
  },
  {
    user_email: "another@example.com",
    user_name: "Another User",
    user_pw: "hashedpassword",
    user_birth: "1995-05-05",
    user_img: "/images/another.jpg",
    k_id: 456,
    w_id: "another_w_id",
    user_provider: "local",
    admin: 1,
  },
];

// Sequelize 모델을 사용하여 데이터베이스에 데이터 삽입
User.bulkCreate(testData)
  .then(() => {
    console.log("데이터 삽입 성공");
  })
  .catch((error) => {
    console.error("데이터 삽입 실패:", error);
  });
