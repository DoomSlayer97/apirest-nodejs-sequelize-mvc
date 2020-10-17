const jwt = require("jsonwebtoken");
const app = require("../config/app");

module.exports = (req, res, next) => {

  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({
    message: "token_not_found"
  });

  jwt.verify(token, app.get("keyauth"), (err, user) => {

    if (err) return res.status(401).json({
      message: "invalid_token"
    });

    req.body.userAuth = user;

    next();

  });

}



