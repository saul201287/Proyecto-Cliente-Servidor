require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const rutaUsuario = require("./router/usuario.router");

app.use(cors());

app.use(express.json());
app.use("/usuarios", rutaUsuario);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API escuchando en el puerto ${PORT}`);
});
