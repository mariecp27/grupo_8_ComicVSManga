// Módulos
const express = require('express');

// Ejecución
const router = express.Router();

// Controlador
const usersController = require('../controllers/usersController');

// Middlewares
const uploadFileUser = require('../middlewares/multerMiddlewareUsers');
const validateRegister = require('../middlewares/validateRegisterMiddleware');
const validateLogin = require('../middlewares/validateLoginMiddleware');
const ifGuestMiddleware = require('../middlewares/ifGuestMiddleware');
const ifLoggedMiddleware = require('../middlewares/ifLoggedMiddleware');

// Rutas

// Formulario de registro de usuarios
router.get('/sign-up', ifLoggedMiddleware, usersController.register);
router.post('/sign-up', uploadFileUser.single('avatar'), validateRegister, usersController.store);

// Formulario de inicio de sesión
router.get('/login', ifLoggedMiddleware, usersController.login);
router.post('/login', validateLogin, usersController.access);

// Pefil del usuario
router.get('/profile', ifGuestMiddleware, usersController.profile);

// Cerrar sesión
router.get('/logout', usersController.logout);

module.exports = router;