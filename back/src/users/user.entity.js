const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../entity");

class User extends Model {}

User.init(
  {
    uid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_pw: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_img: {
      type: DataTypes.STRING,
    },
    original_filename: {
      type: DataTypes.STRING,
    },
    k_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    w_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    user_provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
      validate: {
        isIn: [[0, 1]],
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    freezeTableName: true,
  }
);

const developBoards = sequelize.models.DevelopBoards;
const ideaBoards = sequelize.models.IdeaBoards;
const noticeBoards = sequelize.models.noticeBoards;
const comments = sequelize.models.comments;
// const AdminBoards = sequelize.models.AdminBoards;
User.hasMany(developBoards, {
  foreignKey: "author",
});

developBoards.belongsTo(User, {
  foreignKey: "author",
});
User.hasMany(ideaBoards, {
  foreignKey: "author",
});
ideaBoards.belongsTo(User, {
  foreignKey: "author",
});
User.hasMany(noticeBoards, {
  foreignKey: "author",
});
noticeBoards.belongsTo(User, {
  foreignKey: "author",
});
User.hasMany(comments, {
  foreignKey: "author",
});
comments.belongsTo(User, {
  foreignKey: "author",
});
// User.hasMany(AdminBoards, {
//   foreignKey: "author",
// });
// AdminBoards.belongsTo(User, {
//   foreignKey: "author",
// });
module.exports = {
  User,
};
