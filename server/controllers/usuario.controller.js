const usuarioServices = require('../services/usuario.service');

const create = async (req, res) => {
    try {
        await usuarioServices.create(req.body);

        return res.status(201).json({
            message: "usuario creado exitosamente"
        })
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al crear el usuario",
            error: error.message
        });
    }
}

const getAll = async (req, res) => {
    try {
        const products = await usuarioServices.getUser(req.params);

        return res.status(200).json({
            message: "usuario obtenido exitosamente",
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al consultar los usuarios",
            error: error.message
        });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await usuarioServices.getById(id);

        if (!product) {
            return res.status(404).json({
                message: "producto no encontrado"
            });
        }

        return res.status(200).json({
            message: "producto obtenido exitosamente",
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al consultar el producto",
            error: error.message
        });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, imageUrl } = req.body;
        const product = await usuarioServices.getById(id);

        if (!product) {
            return res.status(404).json({
                message: "producto no encontrado"
            });
        }

        const dataToUpdate = {
            name: name || product.name,
            description: description || product.description,
            price: price || product.price,
            imageUrl: imageUrl || product.image_url
        }

        await usuarioServices.update(id, dataToUpdate);

        return res.status(200).json({
            message: "producto actualizado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al actualizar el producto",
            error: error.message
        });
    }
}

const deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        await usuarioServices.delete(id);

        return res.status(200).json({
            message: "producto eliminado exitosamente"
        })
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al eliminar el producto",
            error: error.message
        });
    }
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: deleteById
}