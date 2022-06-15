// Módulos
const express = require('express');

// Ejecución
const router = express.Router();

// Controlador
const usersController = require('../../controllers/api/usersAPIController');

// Rutas

// Usuarios registrados
router.get('/', usersController.userListReact);
router.get('/:id', usersController.userDetailReact);
router.get('/usersList', usersController.userList);

module.exports = router;