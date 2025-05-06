require('dotenv').config();

const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;


function authenticate(req, res, next) {

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Missing token" })
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
        return res.status(403).json({ message: "Invalid token" })
    }
    req.user = user;
    next();
  });
}

module.exports = authenticate;
