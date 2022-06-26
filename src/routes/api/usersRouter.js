// Módulos
const express = require('express');

// Ejecución
const router = express.Router();

// Controlador
const usersController = require('../../controllers/api/usersAPIController');

// Rutas

// Usuarios registrados

router.get('/', usersController.userListReact);

router.get('/usersList', usersController.userList);

router.post('/login', usersController.tokenCreation);

router.get('/login', usersController.tokenVerification);

router.get('/:id', usersController.userDetailReact);

module.exports = router;