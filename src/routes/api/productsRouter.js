// Módulos
const express = require('express');

// Ejecución
const router = express.Router();

// Controlador
const usersController = require('../../controllers/api/productsAPIController');

// Rutas

// Productos registrados
router.get('/', usersController.productList);

router.get('/categories', usersController.categoryList);

router.get('/formats', usersController.formatList);

router.get('/:id', usersController.productDetail);

module.exports = router;