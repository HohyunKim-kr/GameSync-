exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies && req.cookies.cookie;

    // console.log("token =======================", token);
    if (!token) return next();

    const payload = token.split(".")[1];
    const data = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));

    req.user = data;

    return next();
  } catch (e) {
    res.clearCookie("cookie");
    next(e);
  }
};
