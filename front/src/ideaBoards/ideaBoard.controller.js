const ideaBoardService = require("./ideaBoard.service");

exports.list = async (req, res, next) => {
    try {
        const result = await ideaBoardService.getList();
        console.log(`list controller result :`, result);
        res.render("ideaBoards/list.html");
    } catch (e) {
        next(e);
    }
};

exports.getWrite = (req, res, next) => {
    res.render("ideaBoards/write.html");
};

exports.postWrite = async (req, res, next) => {
    try {
        // console.log(req.body);
        const data = req.body;

        console.log(req.file);
        const file = req.file;

        const boardData = {
            title: data.title,
            author: data.author,
            content: data.content,
            category: data.category,
            image: file.filename,
            original_filename: file.originalname,
        };

        const result = await ideaBoardService.postWrite(boardData);
        console.log(`postWrite controller result :`, result);

        const { id } = result.data;
        res.redirect(`./view?id=${id}`);
    } catch (e) {
        next(e);
    }
};

exports.view = async (req, res, next) => {
    try {
        const { id } = req.query;
        // console.log(data);
        const { data } = await ideaBoardService.getView(id);
        console.log(data);
        res.render("ideaBoards/view.html", { data: data });
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
