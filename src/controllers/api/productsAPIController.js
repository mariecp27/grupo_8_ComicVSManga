const db = require('../../database/models');
const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

let productsAPIController = {
	// Lista de los productos
	productList: async(req, res) => {

		let productsInDBAll = []

		if(req.query.search){
			productsInDBAll = await db.Product.findAll({
				where: {
					name: { [Op.like]: '%' + req.query.search + '%'}
				}
			})
		}else{
			productsInDBAll = await db.Product.findAll()
			.catch(function(errors){
            	console.log(errors);
        	});
		}

		let limit = productsInDBAll.length;
		let offset = 0;

		if(req.query.page){
			limit = 10;
			offset = limit * parseInt(req.query.page);
	   	}

		let productsInDB = [];

		if(req.query.search){
			productsInDB = await db.Product.findAll({
				include: [{
					association: 'categories'
				}],
				where: {
					name: { [Op.like]: '%' + req.query.search + '%'}
				},
				limit,
				offset
			})
				.catch(function(errors){
					console.log(errors);
			});
		}else{
			productsInDB = await db.Product.findAll({
				include: [{
					association: 'categories'
				}],
				limit,
				offset
			})
				.catch(function(errors){
					console.log(errors);
			});
		}

		let products = [];

		let category = '';
		let id = '';
		let name = '';
		let image = '';
		let description = '';
		let categories = [];
		let detail = '';
		
		let counter = 0;

		let categoriesInDb = await db.Category.findAll({
			include: [{
				association: 'products'
			}],
		})
        .catch(function(errors){
            console.log(errors);
        });

		let countByCategory = [];
		let counterByCategory = 0;

		categoriesInDb.forEach(categoryInDb => {
			category = categoryInDb.dataValues.category;

			counterByCategory = 0;

			for(let i = 0; i < categoryInDb.dataValues.products.length; i++){
				counterByCategory += 1;
			}

			let object = {
				name: category,
				amount: counterByCategory,
			}

			countByCategory.push(object);
		})

		productsInDB.forEach(productInDB => {
			categories = [];

			id = productInDB.dataValues.product_id;
			name = productInDB.dataValues.name;
			image = `${process.env.API_LINK}/images/products/${productInDB.dataValues.image}`;
			description = productInDB.dataValues.description;

			for(let i = 0; i < productInDB.dataValues.categories.length; i++){
				categories.push(productInDB.dataValues.categories[i].category);
			}

			detail = `${process.env.API_LINK}/api/products/${id}`;

			let object = {
				id: id,
				name: name,
				image: image,
				description: description,
				categories: categories,
				detail: detail
			}

			products.push(object);
        });

		productsInDBAll.forEach(productInDB => counter += 1);

		return res.status(200).json({
			count: counter,
			countByCategory,
			products: products,
			status: 200
		});
	},
	
	// Detalle de los productos
	productDetail: async(req, res) => {

        let idProduct = req.params.id;

		let productInDB = await db.Product.findByPk(idProduct, {
			include: [
				{association: 'formats'},
				{association: 'categories'},
			]
		})
			.catch(function(errors){
            	console.log(errors);
        });

		let id = productInDB.dataValues.product_id;
		let name = productInDB.dataValues.name;
		let description = productInDB.dataValues.description;
		let image = `${process.env.API_LINK}/images/products/${productInDB.dataValues.image}`;
		let author = productInDB.dataValues.author;
		let format = productInDB.dataValues.formats.format;
		let pages = productInDB.dataValues.pages;
		let price = productInDB.dataValues.price;
		let featured = productInDB.dataValues.featured;
		let onSale = productInDB.dataValues.on_sale;
		let discount = productInDB.dataValues.discount;
		let stock = productInDB.dataValues.stock;

		let categories = [];
		for(let i = 0; i < productInDB.dataValues.categories.length; i++){
			categories.push(productInDB.dataValues.categories[i].category);
		}

		return res.status(200).json({
			id,
			name,
			description,
			image,
			author,
			format,
			pages,
			price,
			featured,
			onSale,
			discount,
			stock,
			categories,
			status: 200
		});
	},

	// Lista de categorías
	categoryList: async(req, res) => {
        let categories = await db.Category.findAll()
        .catch(function(errors){
            console.log(errors);
        });

		return res.status(200).json({
			categories,
			status: 200
		});
	},

	// Lista de formatos
	formatList: async(req, res) => {
        let formats = await db.Format.findAll()
        .catch(function(errors){
            console.log(errors);
        });

		return res.status(200).json({
			formats,
			status: 200
		});
	},

	// Método para almacenar los productos creados
	store: async(req, res) => {

		const token = await req.headers['authorization'];

		if (!token){
			return res.status(401).json({
				error: 'Ingresa tus datos'
			});
		} else{
			jwt.verify(token, 'secret', async function (err, decoded) {
				if (err) {
					return res.status(401).json({
						error: 'No tienes permiso de acceso'
					});
				} else{
					// Verificación de errores
					const resultValidation = validationResult(req);

					if (resultValidation.errors.length > 0) {

						return res.status(400).json({
							errors: resultValidation.array()
						});
					}

					let filename = req.file.filename;

					let isfeatured = 0;
					if (req.body.featured == "on"){
						isfeatured = 1;
					}

					let isOnSale = 0;
					if (req.body.onSale == "on"){
						isOnSale = 1;
					}

					let stringCategories = req.body.category;
					let allcategories = [];

					for(let i = 0; i < stringCategories.length; i++){
						allcategories[i] = Number(stringCategories[i]);
					}
					
					let newProduct = await db.Product.create({
						name: req.body.name,
						description: req.body.description,
						image: filename,
						author: req.body.author,
						format_id: req.body.format,
						pages: Number(req.body.pages),
						price: Number(req.body.price),
						featured: isfeatured,
						on_sale: isOnSale,
						discount: Number(req.body.discount),
						stock: Number(req.body.stock),
					}).catch(function(errors){
						console.log(errors);
					});

					let newProductDB = await db.Product.findOne({
						where:{
							image: filename,
						}
					}).catch(function(errors){
						console.log(errors);
					});

					allcategories.forEach(async (category) => {
						let newCategories = await db.productsCategories.create({
							product_id: newProductDB.product_id,
							category_id: category
						}).catch(function(errors){
							console.log(errors);
						});
					});

					return res.status(201).json({
						newProduct,
						newCategories
					});
				}
			});
		}
	},
};

module.exports = productsAPIController;