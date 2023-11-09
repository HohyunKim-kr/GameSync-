module.exports = (sequelize, DataTypes) => {
    sequelize.define(
        "User",
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
            user_birth: {
                type: DataTypes.DATE,
            },
            user_img: {
                type: DataTypes.STRING,
            },
            k_id: {
                type: DataTypes.INTEGER,
            },
            w_id: {
                type: DataTypes.STRING,
            },
            provider: {
                type: DataTypes.STRING(10),
                allowNull: false,
                validate: {
                    isIn: [["local", "kakao", "web"]],
                },
            },
            admin: {
                type: DataTypes.TINYINT(1),
                defaultValue: 0,
                validate: {
                    isIn: [[0, 1]],
                },
            },
        },
        { freezeTableName: true }
    );
};
