let mainController = {
    carrito: (req, res) =>{
        return res.render('products/productCart');
    },
    votaLoki: (req, res) =>{
        return res.render('products/productDetails-votaALoki');
    },
    nocheMasOscura: (req, res) =>{
        return res.render('products/productDetails-nocheMasOscura');
    },
    shingekiNoKyojin: (req, res) =>{
        return res.render('products/productDetails-shingeki-no-kyojin');
    },
    scottPilgrim: (req, res) =>{
        return res.render('products/productDetails-scott-pilgrim');
    },
};

module.exports = mainController;