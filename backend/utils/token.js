import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const generateJWT = (data, expiresIn = "3d") => {
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: expiresIn });
  return token;
};

const parseToken = (req) => {
  const token = req.headers.authorization.split(" ")[1];

  if(token === 'null' || token === 'undefined' || !token) {
    return null;
  }

  return jwt.verify(token, JWT_SECRET);
};

export { generateJWT, parseToken };
