const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/iniciar-sesion', usersController.login);
router.get('/registro', usersController.registro);

module.exports = router;