const {db} = require("../lib/db");
const Sequelize = require("sequelize");

const {database, username, password} = db;

const sequelize = new Sequelize(database, username, password, db);

// notice entity

// developBoards entity

// ideaBoards entity
require("./ideaBoards/idea.entity")(sequelize, Sequelize.DataTypes);

const {IdeaBoards} = sequelize.models;

module.exports = {
    sequelize,
    IdeaBoards,
};
