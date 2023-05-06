import fs from "fs";

class ProductManager {
  #products;
  #path;

  constructor(path) {
    this.#path = path;
    this.#products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.#path, "utf-8");
      this.#products = JSON.parse(data);
    } catch (error) {
      console.error(`Error al buscar el archivo desde ${this.#path}: ${error}`);
    }
  }

  saveProducts() {
    try {
      const data = JSON.stringify(this.#products, null, "\t");
      fs.writeFileSync(this.#path, data);
    } catch (error) {
      console;
    }
  }

  getProducts = () => {
    let contenido = fs.readFileSync(this.#path, "utf-8");
    contenido = JSON.parse(contenido);
    return contenido;
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    //validacion de no vacios
    let campos = this.#validateField(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    if (campos == 0) {
      console.error("Fail to add product. Incompleted fields.");
      return;
    } else {
      //validacion de no repetir codigo
      let repetidoCode = this.#validateCode(code);
      if (repetidoCode == true) {
        console.error("Fail to add product. Field Code duplicated.");
        return;
      } else {
        //Genero el id autoincremental
        let id = this.#generateId();
        //console.log(id);
        //Hago el push del producto
        let nuevoProducto = {
          id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        //console.log(nuevoProducto);
        this.#products.push(nuevoProducto);
        fs.writeFileSync(
          this.#path,
          JSON.stringify(this.#products, null, "\t")
        );
      }
    }
  };

  #validateField = (title, description, price, thumbnail, code, stock) => {
    let valor;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      valor = 0;
      return valor;
    } else {
      valor = 1;
      return valor;
    }
  };

  #generateId = () => {
    let id;
    if (this.#products.length === 0) {
      id = 1;
    } else {
      id = this.#products[this.#products.length - 1].id + 1;
    }
    return id;
  };

  #validateCode = (code) => {
    let repetido = this.getElementByCode(code);
    if (repetido == undefined) {
      return false;
    } else {
      return true;
    }
  };

  getElementByCode = (code) => {
    return this.#products.find(function (item) {
      return item.code === code;
    });
  };

  getProductById = (id) => {
    let contenido = fs.readFileSync(this.#path, "utf-8");
    contenido = JSON.parse(contenido);
    return contenido.find(function (item) {
      return item.id === id;
    });
  };

  saveProducts() {
    try {
      const data = JSON.stringify(this.#products, null, "\t");
      fs.writeFileSync(this.#path, data);
    } catch (error) {
      console.error(`Error al guardar el archivo en ${this.#path}: ${error}`);
    }
  }

  updateProduct(id, title, description, price, thumbnail, code, stock) {
    let datos = this.#products;
    let updatear = datos.find((element) => element.id === id);
    updatear.title = title;
    updatear.description = description;
    updatear.price = price;
    updatear.thumbnail = thumbnail;
    updatear.code = code;
    updatear.stock = stock;
    this.saveProducts();
  }

  getElementById = (id) => {
    return this.#products.find(function (item) {
      return item.id === id;
    });
  };

  deleteProduct = (id) => {
    let datos = this.#products;
    datos.splice(id - 1, 1);
    this.saveProducts();
  };
}
export default ProductManager;
