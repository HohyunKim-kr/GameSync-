const app = require("./app");
const { sequelize } = require("./src/entity");

app.listen(4000, async () => {
    await sequelize.sync({ force: false });

    console.log(sequelize.models);
    console.log(`DB Connection`);
    console.log("backend server start");
});
