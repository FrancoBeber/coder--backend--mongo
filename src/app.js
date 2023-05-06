import express from "express";
import cartRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import messageRouter from "./routes/message.router.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";

const port = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuro motor de plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");
//
//configuro carpeta publica (archivos estaticos)
app.use(express.static("./src/public"));
//
app.get("/", (req, res) => {
  res.send("Server ok!");
});

app.use("/carts", cartRouter);
app.use("/products", productsRouter);
app.use("/messages", messageRouter);

mongoose.set("strictQuery", false);
try {
  await mongoose.connect(
    "mongodb+srv://fdbeber:KicETQ4TC3iqE3cy@backend.vzzo76k.mongodb.net/ecommerce"
  );
} catch (error) {
  console.log("No se pudo conectar a la base de datos");
}

app.listen(8080, () => {
  console.log(`Server up at port${port}`);
});
