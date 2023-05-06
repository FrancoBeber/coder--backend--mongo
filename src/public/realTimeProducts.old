/*
let title = document.querySelector("#title");
let description = document.querySelector("#description");
let price = document.querySelector("#price");
let thumbnail = document.querySelector("#thumbnail");
let code = document.querySelector("#code");
let stock = document.querySelector("#stock");
*/
const socket = io();
let title;
let description;
let price;
let thumbnail;
let code;
let stock;
let submitButton;
let id;
let deleteButton;

document.querySelector("#title").addEventListener("change", function () {
  title = this.value;
  console.log(title);
});
document.querySelector("#description").addEventListener("change", function () {
  description = this.value;
  console.log(description);
});
document.querySelector("#price").addEventListener("change", function () {
  price = this.value;
  console.log(price);
});
document.querySelector("#thumbnail").addEventListener("change", function () {
  thumbnail = this.value;
  console.log(thumbnail);
});
document.querySelector("#code").addEventListener("change", function () {
  code = this.value;
  console.log(code);
});
document.querySelector("#stock").addEventListener("change", function () {
  stock = this.value;
  console.log(stock);
});
document.querySelector("#send").addEventListener("click", function () {
  let data = {
    title: title,
    description: description,
    price: price,
    thumbnail: thumbnail,
    code: code,
    stock: stock,
  };
  postProduct(title, description, price, thumbnail, code, stock);
  //socket.emit("create", data);
  socket.emit("create", "Se creo un elemento");
});
document.querySelector("#id").addEventListener("change", function () {
  id = this.value;
  console.log(id);
});
document.querySelector("#kill").addEventListener("click", function () {
  deleteProduct(id);
  socket.emit("delete", "Se elimino un elemento");
});

async function deleteProduct(id) {
  let r = await fetch("http://localhost:8080/realtimeproducts/" + id, {
    method: "delete",
    headers: {
      "Content-type": "application/json",
    },
  });
}

async function postProduct(title, description, price, thumbnail, code, stock) {
  let r = await fetch("http://localhost:8080/realtimeproducts", {
    method: "post",
    body: JSON.stringify({
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
}
/*
socket.on("history", (data) => {
  let history = document.getElementById("history");
  let productos = "";
  data.array.forEach((element) => {
    productos += `${element}<br />`;
  });
  history.innerHTML = productos;
});
*/
async function getAllProducts() {
  let r = await fetch("http://localhost:8080/realtimeproducts", {
    method: "get",
    headers: {
      "Content-type": "application/json",
    },
  });
  getAllProducts();
}

getAllProducts();
