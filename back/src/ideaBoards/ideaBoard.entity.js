module.exports = (sequelize, DataTypes) => {
    sequelize.define("IdeaBoards", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        hit: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        category: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        img: {
            type: DataTypes.STRING,
        },
        likeCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    });
};
