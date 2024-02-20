const db = require("../configs/db.config");

(async () => {
  try {
    const connection = await db.createConnection();
    await connection.run(`
            CREATE TABLE IF NOT EXISTS tareas (
                id INTEGER PRIMARY KEY,
                titulo TEXT NOT NULL,
                descripcion TEXT NOT NULL,
                fechaLimite DATE NOT NULL,
                usuario TEXT NOT NULL
            );
        `);

    console.log("Tabla de tareas creada con éxito.");

    await connection.close();
  } catch (error) {
    console.log("Error al crear tabla:", error);
  }
})();
