import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy } from "passport-local";

export const PRIVATE_KEY = "ArrUiNad0";

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
  const token = req.cookies["vamoscolon"];
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(403).json({ error: "Not authorized" });
    req.user = credentials.user;
    next();
  });
};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

export const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) res.status(401).json({ error: "Unauthorized" });
    if (req.user.user.role != role) {
      res.status(403).json({ error: "No Permissions" });
    }
    next();
  };
};
