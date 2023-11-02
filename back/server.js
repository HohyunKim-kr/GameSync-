const app = require("./app");

app.listen(4000, () => {
  try {
    console.log("backend server start");
  } catch (e) {
    console.log(e, "back error");
  }
});
