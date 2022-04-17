// Módulos
const express = require('express');

// Ejecución
const router = express.Router();

// Controlador
const usersController = require('../controllers/usersController');

// Middlewares
const uploadFileUser = require('../middlewares/multerMiddlewareUsers');
const validateRegister = require('../middlewares/validateRegisterMiddleware');

// Rutas

// Formulario de registro de usuarios
router.get('/sign-up', usersController.register);
router.post('/sign-up', uploadFileUser.single('avatar'), validateRegister, usersController.store);


router.get('/login', usersController.login);

module.exports = router;