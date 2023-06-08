import { Router } from "express";
import { generateToken, authToken } from "../util.js";
import userModel from "../models/user.model.js";

const router = Router();

router.get("/register", (req, res) => {
  res.render("jwt/register");
});

router.post("/register", async (req, res) => {
  const userNew = req.body;
  const user = await userModel.findOne({ email }).lean().exec();
  if (user) {
    return res.status(401).render("errors/base", {
      error: "User already exists",
    });
  }
  const userCreate = new userModel(userNew);
  await userCreate.save();
  const access_token = generateToken(userCreate);
  //res.json({ status: "success", access_token });
  res.redirect("/jwt/login");
});

router.get("/login", (req, res) => {
  res.render("jwt/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password }).lean().exec();
  if (!user) {
    return res
      .status(400)
      .json({ status: "error", error: "Invalid credentials" });
  }
  const access_token = generateToken(user);
  //res.json({ status: "success", access_token });
  //res.redirect("/products");
  res.cookie("vamoscolon", access_token).json({ status: "success" });
});

export default router;
