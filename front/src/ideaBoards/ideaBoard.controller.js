const {
    IdeaBoardsRequestDTO,
} = require("../../../back/src/ideaBoards/ideaBoard.dto");
const ideaBoardService = require("./ideaBoard.service");

exports.list = async (req, res, next) => {
    try {
        res.render("ideaBoards/list.html");
    } catch (e) {
        next(e);
    }
};

exports.getWrite = (req, res, next) => {
    res.render("ideaBoards/write.html");
};

exports.view = async (req, res, next) => {
    try {
        res.render("ideaBoards/view.html");
    } catch (e) {
        next(e);
    }
};

exports.modify = async (req, res, next) => {
    try {
        res.render("ideaBoards/modify.html");
    } catch (e) {
        next(e);
    }
};
