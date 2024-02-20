const usuarioServices = require("../services/usuario.service");
let usuarios = [];
let responsesClientes = [];

const create = async (req, res) => {
  try {
    const result = await usuarioServices.create(req.body);
    if (result) {
      return res.status(201).json({
        success: true,
        message: "usuario registrado",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "usuario no registrado",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al crear el usuario",
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  res.status(200).json({
    usuarios,
  });
};

const getNotificationNew = async (req, res) => {
  responsesClientes.push(res);
};

function responderClientes() {
  for (res of responsesClientes) {
    res.status(200).json({
      success: true,
      usuarios:usuarios,
    });
  }

  responsesClientes = [];
}

const sesion = async (req, res) => {
  try {
    const user = await usuarioServices.getUser(req.params);
    if (user) {
      usuarios.push(user[0].name);
      responderClientes();
      return res.status(200).json({
        success: true,
        message: "usuario obtenido exitosamente",
        name: user[0].name,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "usuario no obtenido",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al consultar los usuarios",
      error: error.message,
    });
  }
};

const exitUser = async (req, res) => {
  usuarios = usuarios.filter((elemento) => elemento !== req.params.user);
  responderClientes()
  return res.json({
    success: true,
    message: "Usuario eliminado",
    usuarios,
  });
};
module.exports = {
  create,
  getAll,
  getNotificationNew,
  sesion,
  exitUser,
};
