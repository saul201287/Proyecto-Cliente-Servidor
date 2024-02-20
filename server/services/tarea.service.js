const db = require("../configs/db.config");

const create = async ({ titulo, descripcion, fechaL, usuario }) => {
  const connection = await db.createConnection();
  const query =
    "INSERT INTO tareas (titulo, descripcion, fechaLimite, usuario) VALUES (?,?,?,?)";

  const result = await connection.run(query, titulo, descripcion, fechaL, usuario);
  connection.close();

  if (result.lastID == 0) {
    throw new Error("Tarea no insertado");
  }
  return result;
};

const getTareas = async () => {
  const connection = await db.createConnection();
  const query = "SELECT id, titulo, descripcion, fechaLimite, usuario FROM tareas";

  const result = await connection.all(query);
  connection.close();

  return result;
};

const getByUser = async (usuario) => {
    const connection = await db.createConnection();
    const query = "SELECT titulo, descripcion, fechaLimite, usuario FROM tareas where usuario= ? ";
  
    const result = await connection.all(query,usuario);
    connection.close();
  
    return result;
};

const update = async (id, { name, description, price, imageUrl }) => {
  const connection = await db.createConnection();
  const query =
    "UPDATE products SET name = ?, description = ?, price = ?, image_url = ? WHERE id = ?";

  const result = await connection.run(
    query,
    name,
    description,
    price,
    imageUrl,
    id
  );
  connection.close();

  if (result.changes == 0) {
    throw new Error("producto no actualizado");
  }

  return result;
};

const deleteById = async (id) => {
  const connection = await db.createConnection();
  const query = "DELETE FROM tareas WHERE id = ?";

  const result = await connection.run(query, id);
  connection.close();

  if (result.changes == 0) {
    throw new Error("producto no eliminado");
  }

  return result;
};

module.exports = {
  create,
  getTareas,
  getByUser,
  update,
  delete: deleteById,
};
