const { describe } = require("node:test");
const IdeaService = require("./board/devBoards.service");

describe("board service", () => {
  let ideaService = null;
  let IdeaBoards = {
    create: jest.fn(),
  };

  beforeEach(() => {
    ideaService = new IdeaService(IdeaBoards);
  });

  describe("createBoard", () => {
    it("성공", async);
  });
});
