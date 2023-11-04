// const sequelize = new Sequelize(db.database, db.username, db.password, {
//   dialect: "mysql",
//   host: db.host,
// });

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "DevelopBoards",
    {
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
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      hit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      like: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
    }
  );
