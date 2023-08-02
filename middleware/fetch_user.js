const jwt = require("jsonwebtoken");
const jwt_secret_key = "hritik@09";
const fetch_user = async (req, res, next) => {
  const Token = req.header("token");
  if (!Token) {
    res.send("please authenticate");
  }
  try {
    const data = jwt.verify(Token, jwt_secret_key);

    req.user = data.User;
    next();
  } catch {
    res.status(401).send("middle-error ");
  }
};
module.exports = fetch_user;
