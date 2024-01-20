const db = require('../configs/db.config');

(async () => {
    try {
        const connection = await db.createConnection();
        
        await connection.run(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                price REAL NOT NULL,
                image_url TEXT NOT NULL
            );
        `);

        console.log('Tabla de productos creada con éxito.');
        
        await connection.close();
    } catch (error) {
        console.log('Error al crear tabla de productos:', error);
    }
})();