import { Router } from "express";
import express from "express";
import productModel from "../models/product.model.js";

const router = Router();
//const filename = "./demo.json";
//const productManager = new ProductManager(filename);
//const app = express();
//router.use(express.json());

router.get("/", async (req, res) => {
  const products = await productModel.find().lean().exec();
  res.render("homeRealTimeProducts", { products });
  /*
  let title = "Productos en tiempo real";
  const result = +req.query.limit;
  if (!result) {
    let salida = productManager.getProducts();
    //res.send({ resultado: salida });
    res.render("realTimeProducts", { salida, title });
  } else {
    let nuevo;
    let arr;
    let salida;
    nuevo = productManager.getProducts();
    arr = Array.from(nuevo);
    salida = arr.slice(0, result);
    //res.send({ resultado: salida });
    res.render("realTimeProducts", { salida, title });
  }*/
});

router.post("/", async (req, res) => {
  const productNew = req.body;
  const productGenerated = new productModel(productNew);
  await productGenerated.save();
  res.redirect("/realTimeProducts");
  /*
  const title = req.body.title;
  const description = req.body.description;
  const price = +req.body.price;
  const thumbnail = req.body.thumbnail;
  const code = req.body.code;
  const stock = +req.body.stock;
  productManager.addProduct(title, description, price, thumbnail, code, stock);
  const products = productManager.getProducts();
  //res.status(201).send({ mensaje: "Producto creeado", products });
  res.render("realTimeProducts", { products, title });
  */
});

/*
router.delete("/:id", (req, res) => {
  const id = +req.params.id;
  const product = productManager.getProductById(id);
  if (!product) {
    return res.status(404).send({ message: "Producto no encontrado" });
  } else {
    productManager.deleteProduct(id);
    const products = productManager.getProducts();
    res.status(200).send({ mensage: "Producto eliminado", products });
  }
});
*/

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
