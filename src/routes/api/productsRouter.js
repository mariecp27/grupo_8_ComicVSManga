// Módulos
const express = require('express');

// Ejecución
const router = express.Router();

// Controlador
const productsController = require('../../controllers/api/productsAPIController');

// Middlewares
const uploadFileProduct = require('../../middlewares/multerMiddlewareProducts');
const validateProductCreation = require('../../middlewares/validateProductCreationMiddleware');

// Rutas

// Productos registrados
router.get('/', productsController.productList);

router.get('/categories', productsController.categoryList);

router.get('/formats', productsController.formatList);

router.get('/:id', productsController.productDetail);

router.post('/create', uploadFileProduct.single('image'), validateProductCreation, productsController.store);

module.exports = router;