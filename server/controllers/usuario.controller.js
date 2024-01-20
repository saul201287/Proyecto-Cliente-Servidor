const productService = require('../services/product.service');

const create = async (req, res) => {
    try {
        await productService.create(req.body);

        return res.status(201).json({
            message: "producto creado exitosamente"
        })
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al crear el producto",
            error: error.message
        });
    }
}

const getAll = async (req, res) => {
    try {
        const products = await productService.getAll();

        return res.status(200).json({
            message: "productos obtenidos exitosamente",
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al consultar los productos",
            error: error.message
        });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getById(id);

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
        const product = await productService.getById(id);

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

        await productService.update(id, dataToUpdate);

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
        await productService.delete(id);

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