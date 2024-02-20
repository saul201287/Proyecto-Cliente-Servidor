const db = require("../configs/db.config");

(async () => {
  try {
    const connection = await db.createConnection();
    await connection.run(`
            CREATE TABLE IF NOT EXISTS mensajes (
                id INTEGER PRIMARY KEY,
                mensaje TEXT NOT NULL,
                usuario TEXT NOT NULL,
                grupo TEXT NOT NULL,
                hora TEXT NOT NULL
            );
        `);

    console.log("Tabla de mensajes creada con éxito.");

    await connection.close();
  } catch (error) {
    console.log("Error al crear tabla:", error);
  }
})();
