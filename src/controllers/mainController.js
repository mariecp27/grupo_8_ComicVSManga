let mainController = {
    index: (req, res) =>{
        return res.render('main/index');
    },
    carrito: (req, res) =>{
        return res.render('main/productCart');
    },
};

module.exports = mainController;