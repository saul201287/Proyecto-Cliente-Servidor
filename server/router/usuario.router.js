const router = require("express").Router();
const usuario = require('../controllers/usuario.controller');

router.post('/', usuario.create);
router.get('/:name&:pass', usuario.getAll);
router.get('/:id', usuario.getById);
router.patch('/:id', usuario.update);
router.delete('/:id', usuario.delete);

module.exports = router;