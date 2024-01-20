const express = require('express');
const router = express.Router();
const productsController = require('../server/controllers/products.controller');

router.post('/', productsController.create);
router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.patch('/:id', productsController.update);
router.delete('/:id', productsController.delete);

module.exports = router;