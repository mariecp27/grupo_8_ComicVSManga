const { body } = require('express-validator');
const path = require('path');

const validateProfileEditionValidations = [
	body('user').notEmpty().withMessage('Ingresa tu nombre de usuario').bail()
		.isLength({ min: 1, max: 10 }).withMessage('El máximo de caracteres es de 8').bail()
		.custom(value => !/\s/.test(value)).withMessage('Tu nombre de usuario no debe contener espacios'),
	body('name').notEmpty().withMessage('Ingresa tu(s) nombre(s)'),
	body('lastName').notEmpty().withMessage('Ingresa tu(s) apellido(s)'),
	body('email')
		.notEmpty().withMessage('Escribe un correo electrónico').bail()
		.isEmail().withMessage('Escribe un formato de correo válido'),
	body('password1').notEmpty().withMessage('Escribe tu contraseña actual'),
	body('password3').custom((value, { req }) => {
			const password = req.body.password2
			if(password !== value){
			  throw new Error('Las contraseñas deben coincidir');
			}

			return true;
		}),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		let fileExtension  = '';

		if(!file){
			fileExtension = 'noImage';
		} else{
			fileExtension = path.extname(file.originalname);
		}
		
		if (!acceptedExtensions.includes(fileExtension) && fileExtension != 'noImage') {
			throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
		}

		return true;
	})
]

module.exports = validateProfileEditionValidations;