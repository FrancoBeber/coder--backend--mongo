import express from "express";
import cartRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import messageRouter from "./routes/message.router.js";
import realTimeProductsRouter from "./routes/realtimeproducts.router.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionRouter from "./routes/session.router.js";
import passport from "passport";
import initializePassport from "./passport.config.js";

const port = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://fdbeber:KicETQ4TC3iqE3cy@backend.vzzo76k.mongodb.net/ecommerce",
      dbName: "usuarios-sessions",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: "coder123",
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

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
app.use("/realtimeproducts", realTimeProductsRouter);
app.use("/sessions", sessionRouter);

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
