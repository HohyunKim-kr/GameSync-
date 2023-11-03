const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../src/entity");

beforeAll(async () => {
  console.log(sequelize);
  await sequelize.sync({ force: true });
});

describe("통합테스트 userController", () => {
  it("POST /users", async () => {
    const body = { id: "sangheun", pw: "1234", name: "Ms.park" };
    const response = await request(app)
      .post("/views")
      .set("Content-type", "application/json")
      .send(body);
    console.log(response);
  });
});
