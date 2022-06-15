const db = require('../../database/models');

let productsAPIController = {
	// Lista de los productos
	productList: async(req, res) => {

		let limit = 10;
		let offset = 0;

		if(req.query.page){
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
		let description = '';
		let categories = [];
		let detail = '';
		
		let counter = 0;

		// Contadores
		let counterDC = 0;
		let counterMarvel = 0;
		let counterIndependent = 0;
		let counterManga = 0;
		let counterFantasy = 0;
		let counterTerror = 0;
		let counterFiccion = 0;
		let counterDrama = 0;

		let categoriesInDb = await db.Category.findAll({
			include: [{
				association: 'products'
			}],
		})
        .catch(function(errors){
            console.log(errors);
        });

		categoriesInDb.forEach(categoryInDb => {
			category = categoryInDb.dataValues.category;

			for(let i = 0; i < categoryInDb.dataValues.products.length; i++){
				if(category=='Cómic DC'){
					counterDC +=1;
				}else if(category=='Cómic Marvel'){
					counterMarvel +=1;
				}else if(category=='Cómic Independiente'){
					counterIndependent +=1;
				}else if(category=='Manga'){
					counterManga +=1;
				}else if(category=='Fantasía'){
					counterFantasy +=1;
				}else if(category=='Terror'){
					counterTerror +=1;
				}else if(category=='Ciencia Ficción'){
					counterFiccion +=1;
				}else{
					counterDrama +=1;
				}
			}
		})

		let countByCategory = {
			dc: counterDC,
			marvel: counterMarvel,
			independent: counterIndependent,
			manga: counterManga,
			fantasy: counterFantasy,
			terror: counterTerror,
			ficcion: counterFiccion,
			drama: counterDrama,
		};

		productsInDB.forEach(productInDB => {
			categories = [];

			id = productInDB.dataValues.product_id;
			name = productInDB.dataValues.name;
			description = productInDB.dataValues.description;

			for(let i = 0; i < productInDB.dataValues.categories.length; i++){
				categories.push(productInDB.dataValues.categories[i].category);
			}

			detail = `${process.env.API_LINK}/api/products/${id}`;

			object = {
				id: id,
				name: name,
				description: description,
				categories: categories,
				detail: detail
			}

			products.push(object);
        });

		let productsInDBAll = await db.Product.findAll()
			.catch(function(errors){
            	console.log(errors);
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
};

module.exports = productsAPIController;