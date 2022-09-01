const { response } = require("express");
const express = require("express");
const Conteiner = require("./Conteiner");
const ConteinerComentarios = require("./conteinerComentarios");
const exp = require("constants");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const port = process.env.PORT || 4000;
const conteiner = new Conteiner();
const conteinerComentarios = new ConteinerComentarios()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
conteiner.crearTabla()
conteinerComentarios.crearTabla()
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

io.on("connection", async (socket) => {
  console.log(socket.id)
  console.log("a user connected");
  let productos = await conteiner.seeall();
  const mensaje = {
    productos,
  };
  socket.emit("mensaje-servidor", mensaje);
  socket.on("producto-nuevo", async (producto) => {
    await conteiner.save(producto);
    let productos = await conteiner.seeall();
    const mensaje = {
      productos,
    };
    io.sockets.emit("mensaje-servidor", mensaje);
  });
});

io.on("connection", async (socket) => {
  console.log("a user connected");
  let comentarios = await conteinerComentarios.seeall();
  const datos = {
    comentarios,
  };
  socket.emit("mensaje-servidor-com", datos);
  socket.on("comentario-nuevo", async (mensaje) => {
    await conteinerComentarios.save(mensaje);
    let comentarios = await conteinerComentarios.seeall();

    const datos = {
      comentarios,
    };
    io.sockets.emit("mensaje-servidor-com", datos);
  });
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
