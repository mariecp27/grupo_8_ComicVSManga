const db = require('../../database/models');

let productsAPIController = {
	// Lista de los productos
	productList: async(req, res) => {

		let productsInDBAll = await db.Product.findAll()
			.catch(function(errors){
            	console.log(errors);
        });

		let limit = productsInDBAll.length;
		let offset = 0;

		if(req.query.page){
			limit = 10;
			offset = limit * parseInt(req.query.page);
	   	}

		let productsInDB = await db.Product.findAll({
			include: [{
				association: 'categories'
			}],
			limit,
			offset
		})
			.catch(function(errors){
            	console.log(errors);
        });

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
	}
};

module.exports = productsAPIController;