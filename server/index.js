require("dotenv").config();
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const express = require("express");
const app = express();
const rutaUsuario = require("./router/usuario.router");
const rutaTarea = require("./router/tarea.router");

const corsMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
};
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173"
  },
});
app.use(corsMiddleware);
app.use(express.json());
app.use("/usuarios", rutaUsuario);
app.use("/tareas/", rutaTarea);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`API escuchando en el puerto ${PORT}`);
});


io.on("connection", (socket) => {
  //console.log("Nuevo usuario conectado:", socket.id);

  socket.on('joinRoom', (data) => {
    socket.join(data.room);
    console.log(`Usuario ${data.usuario} se unió a la sala ${data.room}`);
  });

  socket.on('message', (data) => {
    console.log(data);
    socket.broadcast.to(data.room).emit('message', data);
  });

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });

  
});
