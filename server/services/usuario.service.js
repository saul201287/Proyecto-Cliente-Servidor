const db = require('../configs/db.config');

const create = async ({ name, description, price, imageUrl }) => {
    const connection = await db.createConnection();
    const query = "INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)"

    const result = await connection.run(query, name, description, price, imageUrl);
    connection.close();

    if (result.lastID == 0) {
        throw new Error("Producto no insertado");
    }

    return result;
}

const getAll = async () => {
    const connection = await db.createConnection();
    const query = "SELECT id, name, description, price, image_url FROM products";

    const result = await connection.all(query);
    connection.close();

    return result;
}

const getById = async (id) => {
    const connection = await db.createConnection();
    const query = "SELECT id, name, description, price, image_url FROM products WHERE id = ?";

    const result = await connection.get(query, id);
    connection.close();

    return result;
}

const update = async (id, { name, description, price, imageUrl }) => {
    const connection = await db.createConnection();
    const query = "UPDATE products SET name = ?, description = ?, price = ?, image_url = ? WHERE id = ?";

    const result = await connection.run(query, name, description, price, imageUrl, id);
    connection.close();

    if (result.changes == 0) {
        throw new Error("producto no actualizado");
    }

    return result;
}

const deleteById = async (id) => {
    const connection = await db.createConnection();
    const query = "DELETE FROM products WHERE id = ?";

    const result = await connection.run(query, id)
    connection.close();

    if (result.changes == 0) {
        throw new Error("producto no eliminado");
    }

    return result;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: deleteById,
}