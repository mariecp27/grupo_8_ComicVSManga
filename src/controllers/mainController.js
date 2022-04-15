const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

let mainController = {
    // Página de inicio
    index: (req, res) =>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		
        let featuredProducts = products.filter(product => product.featured == true);

        res.render('web/index', { featuredProducts });
    },

    carrito: (req, res) =>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		
        let featuredProducts = products.filter(product => product.featured == true);

        return res.render('web/productCart',{ featuredProducts });
    },
};

module.exports = mainController;