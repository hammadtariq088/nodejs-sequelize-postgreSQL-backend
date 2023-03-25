require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;

const generateAuthToken = (payload) => jwt.sign(payload, secretKey);

const verifyAuthToken = (token) => jwt.verify(token, secretKey);

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
