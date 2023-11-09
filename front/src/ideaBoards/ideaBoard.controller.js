const ideaBoardService = require("./ideaBoard.service");

exports.list = async (req, res, next) => {
    try {
        const { data } = await ideaBoardService.getList();
        console.log(`list controller result :`, data);
        res.render("ideaBoards/list.html", { list: data });
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
        console.log(data.image);
        console.log(data);
        res.render("ideaBoards/view.html", { data: data });
    } catch (e) {
        next(e);
    }
};

exports.getModify = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { data } = await ideaBoardService.getModify(id);

        res.render("ideaBoards/modify.html", { data: data, id });
    } catch (e) {
        next(e);
    }
};

exports.postModify = async (req, res, next) => {
    try {
        const { id } = req.query;
        console.log(id);

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

        console.log(`front modify`, boardData, id);
        const { result } = await ideaBoardService.putModify(id, boardData);
        console.log(`postWrite controller result :`, result);

        res.redirect(`./view?id=${id}`);
    } catch (e) {
        next(e);
    }
};

exports.postDelete = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { data } = await ideaBoardService.postDelete(id);
        console.log(`postDelete controller result :`, data);
        res.redirect(`./`);
    } catch (e) {
        next(e);
    }
};