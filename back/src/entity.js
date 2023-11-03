const { db } = require("../lib/db");
const Sequelize = require("sequelize");

const { database, username, password } = db;

const sequelize = new Sequelize(database, username, password, db);

// noticeBoards entity
require("./noticeBoards/noticeBoard.entity")(sequelize, Sequelize.DataTypes);

// developBoards entity
require("./developBoards/developBoard.entity")(sequelize, Sequelize.DataTypes);

// ideaBoards entity
require("./ideaBoards/ideaBoard.entity")(sequelize, Sequelize.DataTypes);

const { IdeaBoards } = sequelize.models;

module.exports = {
    sequelize,
    IdeaBoards,
};
