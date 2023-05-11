import { Router } from "express";
import express from "express";
import productModel from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  let limit = parseInt(req.query.limit);
  let page = parseInt(req.query.page);
  let sort = req.query.sort;
  let ord;
  if (!page) page = 1;
  if (!limit) limit = 10;
  if (!sort || sort == "asc") {
    ord = 1;
  } else {
    ord = -1;
  }
  const products = await productModel.paginate({}, { page, limit, lean: true });
  products.prevLink = products.hasPrevPage
    ? `/products?page=${products.prevPage}&limit=${products.limit}`
    : "";
  products.nextLink = products.hasNextPage
    ? `/products?page=${products.nextPage}&limit=${products.limit}`
    : "";
  console.log(products);
  res.render("home", products);
});

router.get("/create", (req, res) => {
  res.render("create", {});
});

router.get("/update/:code", async (req, res) => {
  const code = req.params.code;
  const product = await productModel.findOne({ code: code }).lean().exec();
  res.render("update", { product });
});

router.get("/:code", async (req, res) => {
  const code = req.params.code;
  const product = await productModel.findOne({ code: code }).lean().exec();
  res.render("one", { product });
});
router.post("/", async (req, res) => {
  const productNew = req.body;
  const productGenerated = new productModel(productNew);
  await productGenerated.save();
  res.redirect(`/products/${productGenerated.title}`);
});

router.put("/:code", async (req, res) => {
  //const id = +req.params.id;
  const code = req.params.code;
  const productData = req.body;
  try {
    await productModel.updateOne({ code }, { ...productData });
  } catch (error) {
    res.send({ error });
  }
});

router.delete("/:code", async (req, res) => {
  const code = req.params.code;
  try {
    await productModel.deleteOne({ code });
    res.send(`Producto ${code} eliminado exitosamente`);
  } catch (error) {
    res.send({ err });
  }
});

export default router;
