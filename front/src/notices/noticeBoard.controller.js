const noticeboardService = require("./noticeBoard.service");

// getList
exports.getList = async (req, res, next) => {
    try {
        const { data } = await noticeboardService.getList();
        res.render("notices/list.html", { list: data });
    } catch (e) {
        next(e);
    }
};

// getWrite
exports.getWrite = (req, res) => {
    res.render("notices/write.html");
};

// postWrite
exports.postWrite = async (req, res, next) => {
    try {
        // const tmp = {};
        // tmp["title"] = req.body.title;
        // tmp["content"] = req.body.content;
        // tmp["author"] = req.body.author;
        // tmp["date"] = Date.now();
        // tmp["hit"] = 1;
        // tmp["category"] = 1;
        // tmp["img"] = "ASda";
        // tmp["like"] = 1;
        // tmp["createdAt"] = Date.now();
        // tmp["updatedAt"] = Date.now();
        // const { data } = await noticeboardService.postWrite(tmp);
        const data = req.body;
        const file = req.file;
        const boardData = {
            title: data.title,
            author: data.author,
            content: data.content,
            image: file.filename,
            original_filename: file.originalname,
        };
        const result = await noticeboardService.postWrite(boardData);
        const { id } = result.data;
        res.redirect(`./view?id=${id}`);
    } catch (e) {
        next(e);
    }
};

// getView
exports.getView = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { data } = await noticeboardService.getView(id);
        data.content = data.content.replace(/\n/g, "<br>");
        res.render("notices/view.html", { data: data });
    } catch (e) {
        next(e);
    }
};

// postmodify
exports.getModify = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { data } = await noticeboardService.getModify(id);
        res.render("notices/modify.html", { data: data, id });
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
            image: file.filename,
            original_filename: file.originalname,
        };

        const { result } = await noticeboardService.postModify(id, boardData);
        res.redirect(`./view?id=${id}`);
    } catch (e) {
        next(e);
    }
};

// post Delete
exports.postDelete = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { data } = await noticeboardService.postDelete(id);
        console.log(`postDelete controller result :`, data);
        res.redirect(`./`);
    } catch (e) {
        next(e);
    }
};
