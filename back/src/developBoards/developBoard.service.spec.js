const { describe } = require("node:test");
const DevService = require("./developBoard.service");

describe("board service", () => {
  let devService = null;
  let DevService = {
    create: jest.fn(),
  };

  beforeEach(() => {
    devService = new DevService(DevService);
  });

  describe("createBoard", () => {
    it("성공", async () => {
      DevService.create.mock;
    });
  });
});
