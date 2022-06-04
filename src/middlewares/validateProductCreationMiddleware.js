const console = require('console');
const { body } = require('express-validator');
const path = require('path');

const productCreationValidations = [
	body('name').notEmpty().withMessage('Ingresa el nombre del producto').bail()
		.isLength({ min: 5 }).withMessage('El nombre del producto debe tener al menos 5 caracteres'),

	body('description').notEmpty().withMessage('Ingresa la descripción del producto').bail()
		.isLength({ min: 20 }).withMessage('La descripción del producto debe tener al menos 20 caracteres'),

	body('image').custom((value, { req }) => {
			let file = req.file;

			if(!file){
				throw new Error('Inserta la imagen del producto');
			} 

			return true;
		}).bail()
		.custom((value, { req }) => {
			let file = req.file;
			let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
			let fileExtension  = '';

			fileExtension = path.extname(file.originalname);

			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}

			return true;
		}),
	
	body('category').custom((value, { req }) => {
			let mandatoryCategories = ['1', '2', '3', '4'];

			let categorySelected = false;

			if(value){
				mandatoryCategories.forEach(category => {
					for(let i = 0; i < value.length; i++){
						if(category == value[i]){
							categorySelected = true;
						}
					}
				})
			}

			if(!categorySelected){
				throw new Error('Selecciona al menos una categoría principal (DC, Marvel, Independiente o Manga)');
			}

			return true;
		}).bail()
		.custom((value, { req }) => {

			let severalCategoriesSelected = false;

			if(typeof(value) == 'object'){
				value.forEach(category => {
					if(category == '1'){
						for(let i = 0; i < value.length; i++){
							if(value[i] == '2' || value[i] == '3' || value[i] == '4'){
								severalCategoriesSelected = true;
							}
						}
					} else if(category == '2'){
						for(let i = 0; i < value.length; i++){
							if(value[i] == '1' || value[i] == '3' || value[i] == '4'){
								severalCategoriesSelected = true;
							}
						}
					} else if(category == '3'){
						for(let i = 0; i < value.length; i++){
							if(value[i] == '1' || value[i] == '2' || value[i] == '4'){
								severalCategoriesSelected = true;
							}
						}
					} else if(category == '4'){
						for(let i = 0; i < value.length; i++){
							if(value[i] == '1' || value[i] == '2' || value[i] == '3'){
								severalCategoriesSelected = true;
							}
						}
					} 
				});
			}

			if(severalCategoriesSelected){
				throw new Error('Selecciona solo una categoría principal (DC, Marvel, Independiente o Manga)');
			}

			return true;
		}),
	
	body('author').notEmpty().withMessage('Ingresa el/los autores del producto'),
	
	body('format').notEmpty().withMessage('Selecciona el formato'),
	
	body('pages').notEmpty().withMessage('Ingresa la cantidad de páginas del producto'), 
	
	body('price').notEmpty().withMessage('Ingresa el precio del producto'), 

	body('discount').notEmpty().withMessage('Ingresa el descuento. Recuerda: Si no está en oferta, el descuento es "0" (cero)').bail()
		.custom((value, { req }) => {
			let discount = req.body.onSale;

			if(discount == 'on' && value <= 0){
				throw new Error('Puesto que el productor está en oferta, el descuento debe ser mayor a "0" (cero)');
			} else if(discount != 'on' && value > 0) {
				throw new Error('Puesto que el productor no está en oferta, el descuento debe ser igual "0" (cero)');
			} 

			return true;
		}), 

	body('stock').notEmpty().withMessage('Ingresa cuantos productos están disponibles'), 
]

module.exports = productCreationValidations;