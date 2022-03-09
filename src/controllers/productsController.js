let mainController = {
    votaLoki: (req, res) =>{
        return res.render('products/productDetails-votaALoki',{
            title: 'Vota a Loki',
        });
    },
    nocheMasOscura: (req, res) =>{
        return res.render('products/productDetails-nocheMasOscura',{
            title: 'La Noche Más Oscura',
        });
    },
    shingekiNoKyojin: (req, res) =>{
        return res.render('products/productDetails-shingeki-no-kyojin',{
            title: 'Shingeki No Kyojin 27',
        });
    },
    scottPilgrim: (req, res) =>{
        return res.render('products/productDetails-scott-pilgrim',{
            title: 'Scott Pilgrim 4',
        });
    },
};

module.exports = mainController;