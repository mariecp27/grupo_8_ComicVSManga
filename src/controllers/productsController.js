const db = require('../database/models');
const Op = db.Sequelize.Op;

let mainController = {
    // Todos los productos: Tienda
    list: async(req, res) => {

        let wantedProducts = [];

        if(req.query.search){
            wantedProducts = await db.Product.findAll({
                where:{
                    name: { [Op.like]: '%' + req.query.search + '%'}
                },
                order: [
                    ['name', 'ASC']
                ],
            }).catch(function(errors){
                console.log(errors);
            });
        }else{
            wantedProducts = await db.Product.findAll({
                order: [
                    ['name', 'ASC']
                ],
            }).catch(function(errors){
                console.log(errors);
            });
        }

        res.render('products/products', { wantedProducts });

    },

    // Detalle de cada producto
    detail: async(req, res) => {
		
        let idProduct = req.params.id;

		let desiredProduct = await db.Product.findByPk(idProduct, {
            include: [
                {association: 'formats'},
                {association: 'categories'},
            ]
        }).catch(function(errors){
            console.log(errors);
        });

		if(!desiredProduct){
			res.redirect('/products');
		}

        let relatedProducts = [];

        if(desiredProduct.categories[0].dataValues.category.includes('DC')){
            relatedProducts = await db.Product.findAll({
                include: [{
                    association: 'categories',
                    where: { category_id: 1 }
                }],
            }).catch(function(errors){
                console.log(errors);
            });
        }else if(desiredProduct.categories[0].dataValues.category.includes('Marvel')){
            relatedProducts = await db.Product.findAll({
                include: [{
                    association: 'categories',
                    where: { category_id: 2 }
                }],
            }).catch(function(errors){
                console.log(errors);
            });
        }else if(desiredProduct.categories[0].dataValues.category.includes('Independiente')){
            relatedProducts = await db.Product.findAll({
                include: [{
                    association: 'categories',
                    where: { category_id: 3 }
                }],
            }).catch(function(errors){
                console.log(errors);
            });
        }else if(desiredProduct.categories[0].dataValues.category.includes('Manga')){
            relatedProducts = await db.Product.findAll({
                include: [{
                    association: 'categories',
                    where: { category_id: 4 }
                }],
            }).catch(function(errors){
                console.log(errors);
            });
        }
        
		res.render('products/productDetail', { desiredProduct, relatedProducts });
	},

    // Formulario de creación de productos
    create: async(req, res) => {
        
        let categories = await db.Category.findAll()
            .catch(function(errors){
                console.log(errors);
            });

        let formats = await db.Format.findAll()
            .catch(function(errors){
                console.log(errors);
            });

        res.render('admin/productCreation', {
            categories,
            formats
        });
    },

    // Método para almacenar los productos creados
	store: async(req, res) => {

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

		res.redirect('/products');
	},

    // Formulario de edición de productos
    edit: async(req, res) =>{

        let idProduct = req.params.id;

        let productToEdit = await db.Product.findByPk(idProduct, {
            include: [
                {association: 'formats'},
                {association: 'categories'},
            ]
        }).catch(function(errors){
            console.log(errors);
        });

        let categories = await db.Category.findAll()
        .catch(function(errors){
            console.log(errors);
        });

        let formats = await db.Format.findAll()
        .catch(function(errors){
            console.log(errors);
        });

        res.render('admin/productEdition', { 
            productToEdit,
            categories,
            formats
        });

    },

    // Método para actualizar los productos almacenados
    update: async(req, res) => {

        let idProduct = req.params.id;

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

        if(req.file){
            let filename = req.file.filename;

            let updatedProduct = await db.Product.update({
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
            }, {
                where: {
                    product_id: idProduct,
                }
            }).catch(function(errors){
                console.log(errors);
            });
        }else{
            let updatedProduct = await db.Product.update({
                name: req.body.name,
                description: req.body.description,
                author: req.body.author,
                format_id: req.body.format,
                pages: Number(req.body.pages),
                price: Number(req.body.price),
                featured: isfeatured,
                on_sale: isOnSale,
                discount: Number(req.body.discount),
                stock: Number(req.body.stock),
            }, {
                where:{
                    product_id: idProduct,
                }
            }).catch(function(errors){
                console.log(errors);
            });
        }

        let previousCategories = await db.productsCategories.destroy({
            where:{
                product_id: idProduct,
            }
        }).catch(function(errors){
            console.log(errors);
        });

        for(let i = 0; i < stringCategories.length; i++){
            allcategories[i] = Number(stringCategories[i]);
        }

        allcategories.forEach(async (category) => {
            let newCategories = await db.productsCategories.create({
                product_id: idProduct,
                category_id: category
            }).catch(function(errors){
                console.log(errors);
            });
        });

		res.redirect('/products/detail/' + idProduct);
	},

    // Método para eliminar productos almacenados
	destroy : async(req, res) => {

        let idProduct = req.params.id;

        let categories = await db.productsCategories.destroy({
            where:{
                product_id: idProduct,
            }
        }).catch(function(errors){
            console.log(errors);
        });

        let deletedProduct = await db.Product.destroy({
            where: {
                product_id: idProduct,
            },
            force: true
        }).catch(function(errors){
            console.log(errors);
        });

		res.redirect('/products');
	},

    // Categorias
    marvelCategory: async(req, res) => {
        
        const productsInCategory = await db.Product.findAll({
            include: [{
                association: 'categories',
                where: { category_id: 2 }
            }],
            order: [
                ['name', 'ASC']
            ]
        }).catch(function(errors){
            console.log(errors);
        });

        res.render('products/productsMarvel', { productsInCategory });

    },
    dcCategory: async(req, res) => {

        const productsInCategory = await db.Product.findAll({
            include: [{
                association: 'categories',
                where: { category_id: 1 }
            }],
            order: [
                ['name', 'ASC']
            ]
        }).catch(function(errors){
            console.log(errors);
        });

        res.render('products/productsDC', { productsInCategory });

    },
    mangaCategory: async(req, res) => {

        const productsInCategory = await db.Product.findAll({
            include: [{
                association: 'categories',
                where: { category_id: 4 }
            }],
            order: [
                ['name', 'ASC']
            ]
        }).catch(function(errors){
            console.log(errors);
        });

        res.render('products/productsManga', { productsInCategory });

    },
    independentCategory: async(req, res) => {

        const productsInCategory = await db.Product.findAll({
            include: [{
                association: 'categories',
                where: { category_id: 3 }
            }],
            order: [
                ['name', 'ASC']
            ]
        }).catch(function(errors){
            console.log(errors);
        });

        res.render('products/productsIndependent', { productsInCategory });

    },
    comicCategory: async(req, res) => {

        const productsInCategory = await db.Product.findAll({
            include: [{
                association: 'categories',
                where: {
                    category_id: { [Op.or]: [1, 2, 3]},
                }
            }],
            order: [
                ['name', 'ASC']
            ]
        }).catch(function(errors){
            console.log(errors);
        });

        res.render('products/productsComic', { productsInCategory });

    },
};

module.exports = mainController;