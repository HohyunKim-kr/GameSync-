const ideaService = require("./ideaBoard.service");
const { IdeaBoards } = require("../entity");

describe("board service", () => {
    describe("createBoard", () => {
        afterEach(() => {
            jest.restoreAllMocks(); // 각 테스트가 끝난 후 mock을 리셋
        });

        it("성공", async () => {
            const mockReturnValue = {
                id: "1",
                title: "test",
                author: "boram",
            };

            jest.spyOn(IdeaBoards, "create").mockResolvedValue(mockReturnValue);

            const dto = { id: "1", title: "test", author: "boram" };
            const responseBody = await ideaService.createBoard(dto);

            expect(IdeaBoards.create).toBeCalledWith(dto);
            expect(responseBody).toEqual(mockReturnValue);
        });

        it("실패", async () => {
            const mockReturnValue = {
                id: "1",
                title: "test",
                author: "boram",
            };

            jest.spyOn(IdeaBoards, "create").mockResolvedValue(mockReturnValue);
            IdeaBoards.create.mockRejectedValue(new Error("Create Error"));
            const dto = { id: "1", title: "test", author: "boram" };
            expect(
                async () => await ideaService.createBoard(dto)
            ).rejects.toThrowError("Create Error");
        });
    });
});
