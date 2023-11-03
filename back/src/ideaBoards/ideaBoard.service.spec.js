const ideaService = require("./ideaBoard.service");
const IdeaBoards = require("./ideaBoard.entity");

describe("board service", () => {
    describe("createBoard", () => {
        it("성공", async () => {
            // IdeaBoards.create.mockResolvedValue({ id: "test", title: "test" });

            const mockReturnValue = {
                id: "test",
                title: "test",
                author: "boram",
            };
            // jest.spyOn(IdeaBoards, "create").mockResolvedValue(mockReturnValue);

            const dto = { id: "test", title: "test", author: "boram" };
            const responseBody = await ideaService.createBoard(dto);

            expect(IdeaBoards.create).toBeCalledWith(dto);
            expect(responseBody).toEqual(mockReturnValue);
        });

        it("실패", async () => {});
    });
});
