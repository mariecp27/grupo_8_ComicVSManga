const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

let mainController = {
    // Todos los productos: Tienda
    list: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('products/products', { products });

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
        res.render('products/productCreation');
    },

    // Método para almacenar los productos creados
	store: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const filename = req.file.filename;

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
			id: (products.length + 1),
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

    edit: (req, res) =>{
        res.render('products/productEdition');
    },

};

module.exports = mainController;