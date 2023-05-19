import { Router } from "express";
import userModel from "../models/user.model.js";

const router = Router();

//vista para registro de usuarios
router.get("/register", (req, res) => {
  res.render("sessions/register");
});

router.post("/register", async (req, res) => {
  const userNew = req.body;
  const user = new userModel(userNew);
  await user.save();
  res.redirect("/sessions/login");
});

//vista de login
router.get("/login", (req, res) => {
  res.render("sessions/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password }).lean().exec();
  if (!user) {
    return res.status(401).render("errors/base", {
      error: "Error en email y/o contraseña",
    });
  }
  let role;
  let usern = user.email;
  let name = user.first_name;
  let lastn = user.last_name;
  if (email === "adminCoder@coder.com") {
    role = "admin";
  } else {
    role = "standar";
  }
  req.session.user = {
    usern,
    name,
    lastn,
    role,
  };
  res.redirect("/products");
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

export default router;
