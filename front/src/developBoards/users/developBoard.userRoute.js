const express = require("express");
const router = express.Router();

// back 폴더의 developBoardsRouter 모듈 가져오기
const developBoardsRouter = require("../../back/src/developBoards/developBoard.route");

// router.use("/developBoards", developBoardsRouter); 메서드 가져오기
const useDevelopBoardsRouter = developBoardsRouter.use;

// 라우팅 설정
useDevelopBoardsRouter(router);

// 모듈 내보내기
module.exports = router;
