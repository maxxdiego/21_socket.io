const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log(`O usuário desconectou: ${socket.id}`);
  });

  socket.on("msg", (data) => {
    console.log(data);
    // socket.emit("showmsg", data);
    // socket.broadcast.emit("showmsg, data")
    io.emit("showmsg", data);
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
