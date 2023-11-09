const developService = require("./developBoard.service");
const { DevelopBoards } = require("../entity");

describe("board service", () => {
  describe("createBoard", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("성공", async () => {
      const mockReturnValue = {
        id: "1",
        title: "test",
        author: "sang",
      };

      // DevelopBoardsRequestDTO 타입인지 확인
      jest.spyOn(DevelopBoards, "create").mockResolvedValue(mockReturnValue);

      const dto = { id: "1", title: "test", author: "sang" };
      const responseBody = await developService.createBoard(dto);

      expect(DevelopBoards.create).toBeCalledWith(dto);
      expect(responseBody).toEqual(mockReturnValue);
    });

    it("실패", async () => {
      const mockReturnValue = {
        id: "1",
        title: "test",
        author: "sang",
      };

      // DevelopBoardsRequestDTO 타입인지 확인
      jest.spyOn(DevelopBoards, "create").mockResolvedValue(mockReturnValue);
      DevelopBoards.create.mockRejectedValue(new Error("Create Error"));
      const dto = { id: "1", title: "test", author: "sang" };
      expect(
        async () => await developService.createBoard(dto)
      ).rejects.toThrowError("Create Error");
    });
  });
});
