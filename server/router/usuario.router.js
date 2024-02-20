const router = require("express").Router();
const usuario = require('../controllers/usuario.controller');

router.post('/', usuario.create);
router.get('/:name&:pass', usuario.sesion);
router.get("/all",usuario.getAll)
router.get('/notificacionNew', usuario.getNotificationNew);
router.delete("/:user", usuario.exitUser)

module.exports = router;