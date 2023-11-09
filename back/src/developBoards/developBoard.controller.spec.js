const developBoardController = require("./developBoard.controller");
const developBoardService = require("./developBoard.service");
const http = require("node-mocks-http");

jest.mock("./developBoard.service");

describe("board controller", () => {
  describe("create", () => {
    let req, res, next;

    beforeEach(() => {
      req = http.createRequest();
      res = http.createResponse();
      next = jest.fn();
    });
    it("성공", async () => {
      req.body = { id: "1", title: "test", author: "sang" };
      await developBoardController.create(req, res, next);
      expect(developBoardController.createBoard).toBeCalledWith({
        id: "1",
        title: "test",
        author: "sang",
      });
    });
    it("응답", async () => {
      const response = Promise.resolve({ id: 1 });
      developBoardService.createBoard.mockReturnValue(response);

      await developBoardController.create(req, res, next);
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toStrictEqual({ id: 1 });
    });
  });
});
