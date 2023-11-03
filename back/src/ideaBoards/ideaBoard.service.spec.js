const {describe} = require("node:test");
const IdeaService = require("./ideaBoards.service");

describe("board service", () => {
    let ideaService = null;
    let IdeaBoards = {
        create: jest.fn(),
    };

    beforeEach(() => {
        ideaService = new IdeaService(IdeaBoards);
    });

    describe("createBoard", () => {
        it("성공", async () => {
            IdeaBoards.create.mock;
        });
    });
});
