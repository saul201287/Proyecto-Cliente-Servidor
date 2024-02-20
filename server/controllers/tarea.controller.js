const tareaServicess = require("../services/tarea.service");
let tareas = [];

const createT = async (req, res) => {
  try {
    const result = await tareaServicess.create(req.body);
    if (result) {
      return res.status(201).json({
        success: true,
        message: "tarea registrado",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "tarea no registrado",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al crear la tarea",
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  tareas = await tareaServicess.getTareas();
  res.status(200).json({
    success: true,
    message: "tareas encontradas",
    tareas: tareas,
  });
};
const getTareaByUser = async (req, res) => {
  try {
    const result = await tareaServicess.getByUser(req.params.usuario);
    if (result) {
      return res.status(200).json({
        success: true,
        message: "tarea encontradas",
        data: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "tareas no encontradas",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al buscar las tareas",
      error: error.message,
    });
  }
};
const deleteById = async (req, res) =>{
  try {
    const result = await tareaServicess.delete(req.params.id)
 
    if(result){
      res.status(202).json({
        message:"tarea realizada"
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al buscar las tareas",
      error: error.message,
    });
  } 
}

module.exports = {
  createT,
  getAll,
  getTareaByUser,
  deleteById
};
