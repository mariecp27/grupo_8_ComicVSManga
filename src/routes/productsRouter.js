// Módulos
const express = require('express');
const path = require('path');
const multer = require('multer');

// Ejecución
const router = express.Router();

// Configuración
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/product'));
    },
    filename: (req, file, cb) => {
        cb(null, 'product_' + Date.now() + path.extname(file.originalname));
    }
})

let upload = multer({ storage });

// Rutas
const productsController = require('../controllers/productsController');

// Todos los productos: Tienda
router.get('/', productsController.list);

// Detalle de cada producto
router.get('/detail/:id', productsController.detail);

// Formulario de creación de productos
router.get('/create', productsController.create);
router.post('/create', upload.single('image'), productsController.store);

// Formulario de edición de productos
router.get('/:id/edit', productsController.edit);
router.put('/:id/edit', upload.single('image'), productsController.update);

// Acción de eliminación
router.delete('/:id/delete', productsController.destroy);

// Categorias
router.get('/marvel', productsController.marvelCategory);
router.get('/dc', productsController.dcCategory);
router.get('/manga', productsController.mangaCategory);
router.get('/independent', productsController.independentCategory);
router.get('/comic', productsController.comicCategory);

module.exports = router;