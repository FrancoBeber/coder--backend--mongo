import { Router } from "express";
import express from "express";
import cartModel from "../models/cart.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const carts = await cartModel.find().lean().exec();
  res.render("homeCarts", { carts });
  //res.send("Listando carros...");
});

router.get("/:id", async (req, res) => {
  const id = +req.params.id;
  const cart = await cartModel.findOne({ id: id }).lean().exec();
  res.render("oneCart", { cart });
});

router.post("/", async (req, res) => {
  const cartNew = req.body;
  const cartGenerated = new cartModel(cartNew);
  await cartGenerated.save();
  res.redirect(`/carts/${cartGenerated.id}`);
});
/*
router.get("/:id", (req, res) => {
  const id = +req.params.id;
  let datos = cartManager.getCartById(id);
  if (!datos) {
    res.send("Carro no encontrado");
  } else {
    res.send({ resultado: datos });
  }
});

router.post("/", (req, res) => {
  const products = req.body;
  console.log(products);
  cartManager.addCart(products);
  const carts = cartManager.getCarts();
  res.status(201).send({ mensaje: "Producto creeado", carts });
});
*/
export default router;