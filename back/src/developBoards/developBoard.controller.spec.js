const DevelopController = require("./developBoard.controller");
const http = require("node-mocks-http");

describe("create", () => {
  const service = {
    createUser: jest.fn(),
  };
  let req, res, next;
  const developController = new DevelopController(service);

  beforeEach(() => {
    req = http.createRequest();
    res = http.createResponse();
    next = jest.fn();
  });

  it("create 함수를 가지고있는가 ?", () => {
    expect(typeof developController.create).toBe("function");
  });

  it("create 함수에서 service 를 실행하는가 ?", async () => {
    req.body = { id: "sangheun", pw: "1234", name: "Ms.park" };
    await developController.create(req, res, next);
    expect(developController.service.createUser).toBeCalled();
    expect(developController.service.createUser).toBeCalledWith({
      id: "sangheun",
      pw: "1234",
      name: "Ms.park",
    });
  });

  it("응답이 잘도착하는가", async () => {
    const response = Promise.resolve({ id: 1 });
    service.createUser.mockReturnValue(response);

    await developController.create(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBe(true);
    expect(res._getJSONData()).toStrictEqual({ id: 1 });
  });
  it("예외처리가 잘되었는가 ?", async () => {
    const err = { message: "error.." };
    service.createUser.mockReturnValue(Promise.reject(err));
    await controller.create(req, res, next);
    expect(next).toBeCalledWith(err);
  });
});
