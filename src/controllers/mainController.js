let mainController = {
    index: (req, res) =>{
        return res.render('main/index',{
            title: 'Cómic vs Manga',
        });
    },
    carrito: (req, res) =>{
        return res.render('main/productCart',{
            title: 'Carrito de Compras',
        });
    },
};

module.exports = mainController;