const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/login', usersController.login);
router.get('/sign-up', usersController.registro);

module.exports = router;