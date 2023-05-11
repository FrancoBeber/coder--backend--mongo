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
//probar
router.put("/:id", async (req, res) => {
  const id = +req.params.id;
  const listProducts = req.body;
  const cart = await cartModel.findOne({ id: id }).lean().exec();
  //cart.products.push({ products: listProducts });
  try {
    const result = await cartModel.updateOne(
      { id: id },
      { products: listProducts }
    );
  } catch (err) {
    res.send({ err });
  }
});
//probar
router.put("/:id/products/:code", async (req, res) => {
  const id = +req.params.id;
  const codee = req.params.code;
  const quant = req.body.quantity;
  //const cart = await cartModel.findOne({ id: id }).lean().exec();
  //cart.products.code(codee).quantity += quant;
  try {
    const result = await cartModel.updateOne(
      { id: id, products: { code: codee } },
      { $set: { "products.quantity": quant } }
    );
  } catch (err) {
    res.send({ err });
  }
});

router.delete("/:id/products/:code", async (req, res) => {
  const id = +req.params.id;
  const code = req.params.code;
  try {
    const result = await cartModel.updateOne(
      { id: id },
      { $pull: { products: { code: code } } }
    );
  } catch (err) {
    res.send({ err });
  }
  //res.redirect("/carts");
});
export default router;
