// Módulos
const express = require('express');

// Ejecución
const router = express.Router();

// Controlador
const mainController = require('../controllers/mainController');

// Middlewares
const ifGuestMiddleware = require('../middlewares/ifGuestMiddleware');

// Rutas

// Index
router.get('/', mainController.index);

// Carrito de compras
router.get('/shopping-cart', ifGuestMiddleware, mainController.shoppingCart);
router.post('/shopping-cart', ifGuestMiddleware, mainController.shoppingCartAdd);
router.put('/shopping-cart/update', ifGuestMiddleware, mainController.shoppingCartUpdate);
router.delete('/shopping-cart/delete', ifGuestMiddleware, mainController.shoppingCartDelete);

module.exports = router;