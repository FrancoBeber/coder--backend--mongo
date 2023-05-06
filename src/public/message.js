let msg;
let usr;

document.querySelector("#message").addEventListener("change", function () {
  msg = this.value;
});

document.querySelector("#user").addEventListener("change", function () {
  usr = this.value;
});

document.querySelector("#sendM").addEventListener("click", function () {
  let message = {
    user: usr,
    message: msg,
  };
  postMessage(message);
});

async function postMessage(message) {
  let r = await fetch("http://localhost:8080/messages", {
    method: "post",
    body: JSON.stringify({ message: message }),
    headers: {
      "Content-type": "application/json",
    },
  });
}

async function getMessages() {
  let r = await fetch("http://localhost:8080/messages");
  let data = await r.json();
  document.querySelector("#log").innerHTML = data.message.join("<br />");
  getMessages();
}

getMessages();
