const db = require("../configs/db.config");

(async () => {
  try {
    const connection = await db.createConnection();
    await connection.run(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                pass TEXT NOT NULL
            );
        `);

    console.log("Tabla de usuarios creada con éxito.");

    await connection.close();
  } catch (error) {
    console.log("Error al crear tabla:", error);
  }
})();
