const ideaBoardService = require("./ideaBoard.service");
const { getUserInfo } = require("../users/user.service");

exports.list = async (req, res, next) => {
    try {
        const { data } = await ideaBoardService.getList();
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
        const data = req.body;
        const file = req.file;
        const boardData = {
            title: data.title,
            author: data.author,
            content: data.content,
            category: data.category,
            image: file.filename,
            original_filename: file.originalname,
        };
        const token = req.cookies.cookie;
        const result = await ideaBoardService.postWrite(boardData, token);

        const { id } = result.data;
        res.redirect(`./view?id=${id}`);
    } catch (e) {
        next(e);
    }
};

exports.view = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { data } = await ideaBoardService.getView(id);

        if (data.result.content) {
            data.result.content = data.result.content.replace(/\n/g, "<br>");
        }
        res.render("ideaBoards/view.html", { data: data });
    } catch (e) {
        next(e);
    }
};

exports.getModify = async (req, res, next) => {
    try {
        const { id } = req.query;
        const token = req.cookies.cookie;

        const { data } = await ideaBoardService.getModify(id, token);

        if (!token) {
            res.redirect("/users/login");
        }

        const result = await getUserInfo(token);

        if (result.uid !== data.result.author) {
            res.redirect("/users/login");
        } else {
            res.render("ideaBoards/modify.html", { data: data, id });
        }
    } catch (e) {
        next(e);
    }
};

// exports.postWrite = async (req, res, next) => {
//     try {
//         const data = req.body;
//         const file = req.file;
//         const boardData = {
//             title: data.title,
//             author: data.author,
//             content: data.content,
//             category: data.category,
//             image: file.filename,
//             original_filename: file.originalname,
//         };
//         const token = req.cookies.cookie;
//         const result = await ideaBoardService.postWrite(boardData, token);

//         const { id } = result.data;
//         res.redirect(`./view?id=${id}`);
//     } catch (e) {
//         next(e);
//     }
// };

exports.postModify = async (req, res, next) => {
    try {
        const { id } = req.query;
        const data = req.body;
        const file = req.file;

        const boardData = {
            title: data.title,
            author: data.author,
            content: data.content,
            category: data.category,
            image: file.filename,
            original_filename: file.originalname,
        };
        const token = req.cookies.cookie;
        const { result } = await ideaBoardService.putModify(
            id,
            boardData,
            token
        );
        console.log("리저트:", result);

        res.redirect(`./view?id=${id}`);
    } catch (e) {
        next(e);
    }
};

exports.postDelete = async (req, res, next) => {
    try {
        const { id } = req.query;
        const token = req.cookies.cookie;
        if (!token) {
            res.redirect("/users/login");
        }

        const result = await getUserInfo(token);

        const boardData = await ideaBoardService.getView(id);

        if (result.uid !== boardData.data.result.author) {
            res.redirect("/users/login");
        } else {
            const { data } = await ideaBoardService.postDelete(id);
            res.redirect(`./`);
        }
    } catch (e) {
        next(e);
    }
};
