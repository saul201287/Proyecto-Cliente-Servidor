const db = require("../configs/db.config");

const create = async ({ message, usuario, room, hora }) => {
  const connection = await db.createConnection();
  const query =
    "INSERT INTO mensajes (mensaje, usuario, grupo, hora) VALUES (?,?,?,?)";

  const result = await connection.run(query, message, usuario, room, hora);
  connection.close();

  if (result.lastID == 0) {
    throw new Error("Tarea no insertado");
  }
  return result;
};

const getAll = async () => {
    const connection = await db.createConnection();
    const query = "SELECT  mensaje, usuario, grupo, hora FROM mensajes";
  
    const result = await connection.all(query);
    connection.close();
  
    return result;
  };
module.exports = {create, getAll}