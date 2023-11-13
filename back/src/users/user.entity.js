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
      allowNull: false,
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

console.log(User);
console.log(sequelize.models);
module.exports = {
  User,
};
