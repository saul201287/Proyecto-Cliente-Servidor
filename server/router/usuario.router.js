const router = require("express").Router();
const usuario = require('../controllers/usuario.controller');

router.post('/', usuario.create);
router.post("/:name",usuario.postUsuario)
router.get('/:name&:pass', usuario.getAll);
router.get('/notificacion', usuario.getNotification);
router.get('/notificacionNew', usuario.getNotificationNew);

module.exports = router;