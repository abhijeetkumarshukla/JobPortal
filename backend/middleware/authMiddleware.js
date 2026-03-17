const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization || req.headers.Authorization;
  

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {

    const token = authHeader.split(" ")[1]; // remove Bearer

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }

};

module.exports = authMiddleware;