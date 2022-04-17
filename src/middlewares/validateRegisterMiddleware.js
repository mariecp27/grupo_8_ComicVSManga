const { body } = require('express-validator');
const path = require('path');

const registerValidations = [
	body('user').notEmpty().withMessage('Ingresa tu nombre de usuario').bail()
		.custom(value => !/\s/.test(value)).withMessage('Tu nombre de usuario no debe contener espacios'),
	body('name').notEmpty().withMessage('Ingresa tu(s) nombre(s)'),
	body('lastName').notEmpty().withMessage('Ingresa tu(s) apellido(s)'),
	body('email')
		.notEmpty().withMessage('Escribe un correo electrónico').bail()
		.isEmail().withMessage('Escribe un formato de correo válido'),
	body('password1').notEmpty().withMessage('Escribe una contraseña'),
	body('password2').notEmpty().withMessage('Confirma la contraseña').bail()
		.custom((value, { req }) => {
			const password = req.body.password1
			if(password !== value){
			  throw new Error('Las contraseñas deben coincidir');
			}

			return true;
		}),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		return true;
	})
]

module.exports = registerValidations;