// Módulos
const express = require('express');

// Ejecución
const router = express.Router();

// Controlador
const usersController = require('../../controllers/api/usersAPIController');

// Rutas

// Usuarios registrados
router.get('/usersList', usersController.userList);

module.exports = router;