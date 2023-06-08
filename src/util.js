import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const PRIVATE_KEY = "ArrUiNad0";

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

export const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" });
  return token;
};

export const authToken = (req, res, next) => {
  const token = req.headers.auth;
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(403).json({ error: "Not authorized" });
    req.user = credentials.user;
    next();
  });
};
