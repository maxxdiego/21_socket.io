const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
    
  socket.on("disconnect", () => {
    console.log(`O usuário desconectou: ${socket.id}`);
  });

  socket.on("welcome", (data) => {
    console.log(data);
  });

  socket.on("palavra", (data) => {
    console.log(data);
    socket.emit("resultado", data + " - Diego max");
  });
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

const port = 3000;
http.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});
