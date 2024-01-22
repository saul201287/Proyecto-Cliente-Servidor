const usuarioServices = require('../services/usuario.service');
const usuarios = []
let responsesClientes = [];
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

const getNotification = async (req, res) => {

        res.status(200).json({
            success: true,
            usuario : usuarios
        });
}
const getNotificationNew = async (req, res) => {
   responsesClientes.push(req.params.user)
}
function responderClientes(usuario) {
    for (res of responsesClientes) {
        res.status(200).json({
            success: true,
            usuario
        });
    }

    responsesClientes = [];
}
const postUsuario = async (req, res) => {
    const usuario = {
        name: req.params.name
    }
    usuarios.push(usuario)
    responderClientes(usuario)
    return res.status(201).json({
        success: true,
        message: "cliente guardado"
    });
}


module.exports = {
    create,
    getAll,
    getNotification,
    getNotificationNew,
    postUsuario
}