const { describe } = require("node:test");
const DevelopService = require("./developBoard.service");

describe("board service", () => {
  let devService = null;
  let DevService = {
    create: jest.fn(),
  };

  beforeEach(() => {
    devService = new DevelopService(DevService);
  });

  describe("createBoard", () => {
    it("성공", async () => {
      DevService.create.mock;
    });
  });
});
