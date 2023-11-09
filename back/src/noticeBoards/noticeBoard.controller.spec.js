const noticeBoardController = require("./noticeBoard.controller");
const noticeBoardService = require("./noticeBoard.service");
const http = require("node-mocks-http");

jest.mock("./noticeBoard.service");

describe("board controller", () => {
  describe("create", () => {
    let req, res, next;

    beforeEach(() => {
      req = http.createRequest();
      res = http.createResponse();
      next = jest.fn();
    });
    it("성공", async () => {
      req.body = new NoticeBoardRequestDTO({
        id: "1",
        title: "test",
        author: "hohyun",
      });
      await noticeBoardController.create(req, res, next);
      expect(noticeBoardService.createBoard).toBeCalledWith(
        expect.objectContaining({
          id: "1",
          title: "test",
          author: "hohyun",
        })
      );
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toStrictEqual({ id: 1 });
    });
    it("응답", async () => {
      const response = Promise.resolve({ id: 1 });
      noticeBoardService.createBoard.mockReturnValue(response);

      await noticeBoardController.create(req, res, next);
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toStrictEqual({ id: 1 });
    });
  });
});
