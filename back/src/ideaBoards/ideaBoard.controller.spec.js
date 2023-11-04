const ideaBoardController = require("./ideaBoard.controller");
const ideaBoardService = require("./ideaBoard.service");
const http = require("node-mocks-http");

jest.mock("./ideaBoard.service");

describe("board controller", () => {
    describe("create", () => {
        let req, res, next;

        beforeEach(() => {
            req = http.createRequest();
            res = http.createResponse();
            next = jest.fn();
        });
        it("성공", async () => {
            req.body = { id: "1", title: "test", author: "boram" };
            await ideaBoardController.create(req, res, next);
            expect(ideaBoardService.createBoard).toBeCalledWith({
                id: "1",
                title: "test",
                author: "boram",
            });
        });
        it("응답", async () => {
            const response = Promise.resolve({ id: 1 });
            ideaBoardService.createBoard.mockReturnValue(response);

            await ideaBoardController.create(req, res, next);
            expect(res.statusCode).toBe(201);
            expect(res._getJSONData()).toStrictEqual({ id: 1 });
        });
    });
});
