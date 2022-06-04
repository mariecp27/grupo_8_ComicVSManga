// Módulos
const express = require('express');
const path = require('path');
const multer = require('multer');

// Ejecución
const router = express.Router();

//Controlador
const productsController = require('../controllers/productsController');

// Middlewares
const uploadFileProduct = require('../middlewares/multerMiddlewareProducts');
const onlyAdminMiddleware = require('../middlewares/onlyAdminMiddleware');
const validateProductCreation = require('../middlewares/validateProductCreationMiddleware');
const validateProductEdition = require('../middlewares/validateProductEditionMiddleware');

// Rutas

// Todos los productos: Tienda
router.get('/', productsController.list);

// Detalle de cada producto
router.get('/detail/:id', productsController.detail);

// Formulario de creación de productos
router.get('/create', onlyAdminMiddleware, productsController.create);
router.post('/create', uploadFileProduct.single('image'), validateProductCreation, productsController.store);

// Formulario de edición de productos
router.get('/:id/edit', onlyAdminMiddleware, productsController.edit);
router.put('/:id/edit', uploadFileProduct.single('image'), validateProductEdition, productsController.update);

// Acción de eliminación
router.delete('/:id/delete', productsController.destroy);

// Categorias
router.get('/marvel', productsController.marvelCategory);
router.get('/dc', productsController.dcCategory);
router.get('/manga', productsController.mangaCategory);
router.get('/independent', productsController.independentCategory);
router.get('/comic', productsController.comicCategory);

module.exports = router;