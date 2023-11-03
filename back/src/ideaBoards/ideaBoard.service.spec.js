const IdeaService = require("./ideaBoard.service");

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
            IdeaBoards.create.mockResolvedValue({ id: "test", title: "test" });

            const dto = { id: "test", title: "test" };
            const responseBody = await ideaService.createBoard(dto);

            expect(IdeaBoards.create).toBeCalledWith(dto);
            expect(responseBody).toStrictEqual({ id: "test", title: "test" });
        });

        it("실패", async () => {});
    });
});
