const { body } = require('express-validator');

const loginValidations = [
	body('email')
		.notEmpty().withMessage('Escribe un correo electrónico').bail()
		.isEmail().withMessage('Escribe un formato de correo válido'),
		
	body('password').notEmpty().withMessage('Escribe una contraseña'),
]

module.exports = loginValidations;