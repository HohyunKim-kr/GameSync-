module.exports = (sequelize, DataTypes) => {
  sequelize.define("noticeBoards", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
      defaultVaule: DataTypes.NOW,
    },
    hit: {
      type: DataTypes.INTEGER,
      defaultVaule: 0,
    },
    category: {
      type: DataTypes.INTEGER,
      defaultVaule: 1,
    },
    img: {
      type: DataTypes.STRING(255),
    },
    like: {
      type: DataTypes.INTEGER,
      defaultVaule: 0,
    },
  });
};
