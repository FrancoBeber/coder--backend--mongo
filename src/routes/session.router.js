import { Router } from "express";
import userModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../util.js";
import passport from "passport";

const router = Router();

//vista para registro de usuarios
router.get("/register", (req, res) => {
  res.render("sessions/register");
});

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/sessions/failRegister",
  }),
  async (req, res) => {
    //const userNew = req.body;
    //userNew.password = createHash(req.body.password);

    //const user = new userModel(userNew);
    //await user.save();
    res.redirect("/sessions/login");
  }
);

router.get("/failRegister", (req, res) => {
  res.send({ error: "Failed..." });
});

//vista de login
router.get("/login", (req, res) => {
  res.render("sessions/login");
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/sessions/failLogin",
  }),
  async (req, res) => {
    //const { email, password } = req.body;
    //const user = await userModel.findOne({ email }).lean().exec();
    //if (!user) {
    //  return res.status(401).render("errors/base", {
    //    error: "User not found",
    //  });
    //}
    //if (!isValidPassword(user, password)) {
    //  return res
    //    .status(403)
    //    .send({ status: "error", error: "Incorrect password" });
    //}
    //let role;
    //if (email === "adminCoder@coder.com") {
    //  role = "admin";
    //} else {
    //  role = "standar";
    //}
    //delete user.password;
    //req.session.user = user;
    //req.session.user = {
    //first_name: req.user.first_name,
    //last_name: req.user.last_name,
    //email: req.user.email,
    //age: req.user.age,
    //role,
    //};
    if (!req.user) {
      return res
        .status(400)
        .send({ status: "error", error: "Invalid credentials" });
    }

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
    };

    res.redirect("/products");
  }
);

router.get("/failLogin", (req, res) => {
  res.send({ error: "Fail login..." });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err)
      res.status(500).render("errors/base", {
        error: err,
      });
    else {
      res.redirect("/sessions/login");
    }
  });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/products");
  }
);

export default router;
