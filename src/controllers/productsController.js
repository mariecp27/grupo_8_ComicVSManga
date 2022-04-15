const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

let mainController = {
    // Todos los productos: Tienda
    list: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        let wantedProducts = [];

        if(req.query.search){
            wantedProducts = products.filter(product => product.name.toLowerCase().includes(req.query.search.toLowerCase()));
        }else{
            wantedProducts = products;
        }

        res.render('products/products', { wantedProducts });

    },

    // Detalle de cada producto
    detail: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		
        let idProduct = req.params.id;

		let desiredProduct = products.find(product => product.id == idProduct);

		if(!desiredProduct){
			res.redirect('products/products');
		}

        let relatedProducts = [];
  
        if (desiredProduct.category.includes('marvel')){
            relatedProducts = products.filter(product =>{
                return product.category.includes('marvel');
            })
        } else if (desiredProduct.category.includes('dc')){
            relatedProducts = products.filter(product =>{
                return product.category.includes('dc');
            })
        }else if (desiredProduct.category.includes('manga')){
            relatedProducts = products.filter(product =>{
                return product.category.includes('manga');
            })
        }else{
            relatedProducts = products.filter(product =>{
                return product.category.includes('independiente');
            })
        }

		res.render('products/productDetail', { desiredProduct, relatedProducts });
	},

    // Formulario de creación de productos
    create: (req, res) => {
        res.render('admin/productCreation');
    },

    // Método para almacenar los productos creados
	store: (req, res) => {
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        let nextId = products[products.length - 1].id + 1;

		let filename = req.file.filename;

        let isfeatured = false;
        if (req.body.featured == "on"){
            isfeatured = true;
        }

        let isOnSale = false;
        if (req.body.onSale == "on"){
            isOnSale = true;
        }

        let allcategories = [];
        allcategories.push(req.body.category);
        let storedCategories = allcategories.join(', ');

		
		let newProduct = {
			id: nextId,
			name: req.body.name,
            description: req.body.description,
			image: filename,
            category: storedCategories,
            author: req.body.author,
            format: req.body.format,
            pages: Number(req.body.pages),
            price: Number(req.body.price),
            featured: isfeatured,
            onSale: isOnSale,
            discount: Number(req.body.discount),
		}

		products.push(newProduct);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

		res.redirect('/products');
	},

    // Formulario de edición de productos
    edit: (req, res) =>{
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        let idProduct = req.params.id;

        let productToEdit = products.find(product => product.id == idProduct);

        res.render('admin/productEdition', { productToEdit });
    },

    // Método para actualizar los productos almacenados
    update: (req, res) => {
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        let idProduct = req.params.id;

        let filename = '';
        if(req.file){
            filename = req.file.filename;
        };

        let allcategories = [];
        allcategories.push(req.body.category);
        let storedCategories = allcategories.join(', ');

        let isfeatured = false;
        if (req.body.featured == "on"){
            isfeatured = true;
        }

        let isOnSale = false;
        if (req.body.onSale == "on"){
            isOnSale = true;
        }

		products.forEach(product => {
            if(product.id == idProduct){
                product.name = req.body.name;
                product.description= req.body.description;
                if(filename != ''){
					product.image = filename;
				};
                product.category = storedCategories;
                product.author = req.body.author;
                product.format = req.body.format;
                product.pages = Number(req.body.pages);
                product.price = Number(req.body.price);
                product.featured = isfeatured;
                product.onSale = isOnSale;
                product.discount = Number(req.body.discount);
            }
        })

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

		res.redirect('/products/detail/' + idProduct);
	},

    // Método para eliminar productos almacenados
	destroy : (req, res) => {
        		
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let idProduct = req.params.id;

		let remainingProducts = products.filter(product => product.id != idProduct);

        fs.writeFileSync(productsFilePath, JSON.stringify(remainingProducts, null, 2));

		products = remainingProducts;

		res.redirect('/products');
	},

    // Categorias
    marvelCategory: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const productsInCategory = products.filter(product => product.category.includes('marvel'));

        res.render('products/productsMarvel', { productsInCategory });

    },
    dcCategory: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const productsInCategory = products.filter(product => product.category.includes('dc'));

        res.render('products/productsDC', { productsInCategory });

    },
    mangaCategory: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const productsInCategory = products.filter(product => product.category.includes('manga'));

        res.render('products/productsManga', { productsInCategory });

    },
    independentCategory: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const productsInCategory = products.filter(product => product.category.includes('independiente'));

        res.render('products/productsIndependent', { productsInCategory });

    },
    comicCategory: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const productsInCategoryMarvel = products.filter(product => product.category.includes('marvel'));
        const productsInCategoryDC = products.filter(product => product.category.includes('dc'));
        const productsInCategoryIndependent = products.filter(product => product.category.includes('independiente'));

        const productsInCategory = [
            ...productsInCategoryMarvel,
            ...productsInCategoryDC,
            ...productsInCategoryIndependent
        ]

        res.render('products/productsComic', { productsInCategory });

    },
};

module.exports = mainController;