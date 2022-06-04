const { body } = require('express-validator');
const path = require('path');

const registerValidations = [
	body('user').notEmpty().withMessage('Ingresa tu nombre de usuario').bail()
		.isLength({ min: 1, max: 10 }).withMessage('El máximo de caracteres es de 10')
		.custom(value => !/\s/.test(value)).withMessage('Tu nombre de usuario no debe contener espacios'),

	body('name').notEmpty().withMessage('Ingresa tu(s) nombre(s)').bail()
		.isLength({ min: 2 }).withMessage('Tu nombre debe tener al menos 2 caracteres'),

	body('lastName').notEmpty().withMessage('Ingresa tu(s) apellido(s)').bail()
		.isLength({ min: 2 }).withMessage('Tu apellido debe tener al menos 2 caracteres'),

	body('email')
		.notEmpty().withMessage('Escribe un correo electrónico').bail()
		.isEmail().withMessage('Escribe un formato de correo válido'),

	body('password1').notEmpty().withMessage('Escribe una contraseña').bail()
		.isLength({ min: 8 }).withMessage('Tu contraseña debe tener al menos 8 caracteres')
		.matches(/(?=.*?[A-Z])/).withMessage('Ingresa al menos una letra mayúscula')
        .matches(/(?=.*?[a-z])/).withMessage('Ingresa al menos una letra minúscula')
        .matches(/(?=.*?[0-9])/).withMessage('Ingresa al menos un número')
        .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('Ingresa al menos un carácter especial'),

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
		let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
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

module.exports = registerValidations;