const db = require('../database/models');

let mainController = {
    // Página de inicio
    index: async(req, res) =>{

       let featuredProducts = await db.Product.findAll({
           where:{
               featured: 1,
           },
           order: [
                ['name', 'ASC']
            ],
        }).catch(function(errors){
            console.log(errors);
        });

       return res.render('web/index', { featuredProducts });
    },

    // Carrito de compras
    carrito: async(req, res) =>{

        let featuredProducts = await db.Product.findAll({
            where:{
                featured: 1,
            },
            order: [
                 ['name', 'ASC']
            ],
            limit: 4
         }).catch(function(errors){
             console.log(errors);
         });
 

        return res.render('web/productCart',{ featuredProducts });
    },
};

module.exports = mainController;