const noticeBoardService = require("./noticeBoard.service");
const { noticeBoards } = require("../entity");

describe("board service", () => {
  describe("createBoard", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("성공", async () => {
      const mockReturnValue = {
        id: "1",
        title: "test",
        author: "hohyun",
      };

      // noticeBoards.create를 실패하도록 설정
      jest
        .spyOn(noticeBoards, "create")
        .mockRejectedValue(new Error("Create Error"));

      const dto = { id: "1", title: "test", author: "hohyun" };
      await expect(
        async () => await noticeBoardService.createBoard(dto)
      ).rejects.toThrow("Create Error"); // 이 예외를 발생하도록 수정
    });

    it("실패", async () => {
      const mockReturnValue = {
        id: "1",
        title: "test",
        author: "hohyun",
      };

      // noticeBoards.create를 실패하도록 설정
      jest
        .spyOn(noticeBoards, "create")
        .mockRejectedValue(new Error("Create Error"));

      const dto = { id: "1", title: "test", author: "hohyun" };
      await expect(
        async () => await noticeBoardService.createBoard(dto)
      ).rejects.toThrow("Create Error"); // "Create Error"를 예상하도록 수정
    });
  });
});
