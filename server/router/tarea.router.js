const router = require("express").Router();
const tarea = require('../controllers/tarea.controller');

router.post("/",tarea.createT)
router.get("/",tarea.getAll)
router.get("/:usuario", tarea.getTareaByUser)
router.delete("/:id",tarea.deleteById)

module.exports = router