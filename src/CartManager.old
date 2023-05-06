import fs from "fs";

class CartManager {
  #id;
  #products;

  constructor() {
    this.#id = this.#generateId();
    this.#products = [];
    this.loadData();
  }

  loadData() {
    try {
      let content = fs.readFileSync("./src/routes/carts.json", "utf-8");
      content = JSON.parse(content);
      let data = content.find((element) => element.id === this.#id);
      if (!data) {
        this.#products = [];
      } else {
        this.#products = data;
      }
    } catch {
      console.error(`Error al leer datos del archivo`);
    }
  }

  getCarts() {
    let contenido = fs.readFileSync("./src/routes/carts.json", "utf-8");
    contenido = JSON.parse(contenido);
    return contenido;
  }

  getCartById(id) {
    let contenido = fs.readFileSync("./src/routes/carts.json", "utf-8");
    contenido = JSON.parse(contenido);
    return contenido.find(function (item) {
      return item.id === id;
    });
  }

  #generateId = () => {
    let id;
    let carts = this.getCarts();
    if (carts.length === 0) {
      id = 1;
    } else {
      id = carts[carts.length - 1].id + 1;
    }
    return id;
  };

  addCart(prod) {
    let id = this.#generateId();
    console.log(id);
    const products = prod;
    let cart = {
      id,
      products,
    };
    try {
      let carts = this.getCarts();
      carts.push(cart);
      fs.writeFileSync(
        "./src/routes/carts.json",
        JSON.stringify(carts, null, "\t")
      );
    } catch (error) {
      console.error(`Error al Crear el carro`);
    }
  }

  addProduct(cartid, productid) {
    let cart = this.getCartById(cartid);
    if (!cart) {
      console.error("Carro no encontrado");
    } else {
      console.log(cart);
      let product = cart.find((element) => element.id === productid);
      if (!product) {
        console.log(product);
        cart.#products.push({ id: productid, quantity: 1 });
      } else {
        cart.#products[productid].quantity =
          cart.#products[productid].quantity + 1;
      }
    }
  }
}

export default CartManager;
/*
const cartManager = new CartManager();
console.log("Los carros que ya tenia el archivo son: ");
console.log(cartManager.getCarts());
console.log("Agregamos un nuevo carro: ");
cartManager.addCart([
  { id: 1, quantity: 2 },
  { id: 4, quantity: 5 },
  { id: 6, quantity: 3 },
]);
console.log("Los carros son: ");
console.log(cartManager.getCarts());
*/
