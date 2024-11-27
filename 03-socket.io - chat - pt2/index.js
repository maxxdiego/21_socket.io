const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log(`O usuário com a ID: ${socket.id} desconectou.`);
  });

  socket.on("join", (data) => {
    console.log(`${data.nickname} entrou no chat.`);
    // socket.emit("showmsg", data);
    // socket.broadcast.emit("showmsg, data")
    io.emit("join", data);
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
const host = "0.0.0.0"
http.listen(port, host, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});
