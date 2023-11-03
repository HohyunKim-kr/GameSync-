const noticeService = require("./noticeBoard.service");

describe("board service", () => {
  let noticeService = null;
  let noticeBoards = {
    create: jest.fn(),
  };

  beforeEach(() => {
    noticeService = new noticeService(noticeBoards);
  });

  descrive("createBoard", () => {
    it("성공", async () => {
      noticeBoards.create.mockResolvedValue({ id: "test", title: "test" });

      const dto = { id: "test", title: "test" };
      const responseBody = await noticeService.createBoard(dto);

      expect(noticeBoards.create).toBeCalledWith(dto);
      expect(responseBody).toStrictEqual({ id: "test", title: "test" });
    });
    it("실패", async () => {});
  });
});
