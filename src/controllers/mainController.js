const db = require('../database/models');

let mainController = {
    // Página de inicio
    index: async(req, res) =>{

        // Productos destacados
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

    // Carrito de compras (get method)
    shoppingCart: async(req, res) =>{

        // Carrito actual desde base de datos
        let shoppingCart = await db.ShoppingCart.findOne({
            where: {
                user_id: req.session.userLogged.user_id,
            }
        }).catch(function(errors){
            console.log(errors);
        });

        if(shoppingCart){

            // Información de los productos en el carrito
            const currentProducts = await db.Product.findAll({
                include: [{
                    association: 'shoppingCarts',
                    where: { shopping_cart_id: shoppingCart.shopping_cart_id }
                }]
            }).catch(function(errors){
                console.log(errors);
            });

            // Detalle de los productos en el carrito (cantidad y total parcial)
            let currentProductsCart = await db.ProductShoppingCart.findAll({
                where: {
                    shopping_cart_id: shoppingCart.shopping_cart_id
                }
            }).catch(function(errors){
                console.log(errors);
            });

            // Productos destacados
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

            return res.render('web/productCart', {
                currentProducts,
                currentProductsCart,
                newShoppingCart: shoppingCart,
                featuredProducts
            });
        }else{
            // Información de los productos en el carrito
            const currentProducts = []

            // Productos destacados
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

            return res.render('web/productCart',{
                currentProducts,
                featuredProducts
            });
        }
    },

    // Agregar productos al carrito de compras
    shoppingCartAdd: async(req, res) =>{

        idProduct = req.body.id;

        // Producto a agregar
        let desiredProduct = await db.Product.findByPk(idProduct)
        .catch(function(errors){
            console.log(errors);
        });
        
        // Verificar si el usuario ya tiene un carrito asignado
        let shoppingCart = await db.ShoppingCart.findOne({
            where: {
                user_id: req.session.userLogged.user_id,
            }
        }).catch(function(errors){
            console.log(errors);
        });

        let total = 0;
        
        if(!shoppingCart){
            
            // Creación carrito por usuario
            let newCar = await db.ShoppingCart.create({
                user_id: req.session.userLogged.user_id,
                total: total,
            }).catch(function(errors){
                console.log(errors);
            });

            // Actualización información del carrito
            shoppingCart = await db.ShoppingCart.findOne({
                where: {
                    user_id: req.session.userLogged.user_id,
                }
            }).catch(function(errors){
                console.log(errors);
            });
        }else{
            // Extracción del total en el carrito existente en base de datos
            total = Number(shoppingCart.total);
        }

        // Verificación de los productos en el carrito
        let previousProducts = await db.ProductShoppingCart.findAll({
            where: {
                shopping_cart_id: shoppingCart.shopping_cart_id
            }
        }).catch(function(errors){
            console.log(errors);
        });

        // Verificar qué cantidad de agregará por producto
        let amount = 1;

        if(req.body.amount){
            amount = Number(req.body.amount);
        }
        
        // Precio parcial por producto
        let productTotal = amount*desiredProduct.price;

        // Agregar productos al carrito si se tienen o no productos previos
        if(previousProducts.length == 0){

            // Creación de nuevo producto en el carrito
            let newProduct = await db.ProductShoppingCart.create({
                shopping_cart_id: shoppingCart.shopping_cart_id,
                product_id: idProduct,
                amount: amount,
                product_total: productTotal,
            }).catch(function(errors){
                console.log(errors);
            });
        
            // Actualización del total del carrito
            total += productTotal;
    
            let updatedCart = await db.ShoppingCart.update({
                total: total,
            }, {
                where: {
                    user_id: req.session.userLogged.user_id,
                }
            }).catch(function(errors){
                console.log(errors);
            });    
        } else{
            let canBeSaved = true;

            previousProducts.forEach(async(product) => {
                if(desiredProduct.product_id == product.product_id){
                    canBeSaved = false;
                }
            });
            
            // Creación de nuevo producto en el carrito
            if(canBeSaved){

                let newProduct = await db.ProductShoppingCart.create({
                    shopping_cart_id: shoppingCart.shopping_cart_id,
                    product_id: idProduct,
                    amount: amount,
                    product_total: productTotal,
                }).catch(function(errors){
                    console.log(errors);
                });
    
                // Actualización del total del carrito
                total += productTotal;
    
                let updatedCart = await db.ShoppingCart.update({
                    total: total,
                }, {
                    where: {
                        user_id: req.session.userLogged.user_id,
                    }
                }).catch(function(errors){
                    console.log(errors);
                }); 
            }
        }

        // Información de los productos en el carrito
        let currentProducts = await db.Product.findAll({
            include: [{
                association: 'shoppingCarts',
                where: {
                    shopping_cart_id: shoppingCart.shopping_cart_id,
                }
            }]
        }).catch(function(errors){
            console.log(errors);
        });

        // Detalle de los productos en el carrito (cantidad y total parcial)
        let currentProductsCart = await db.ProductShoppingCart.findAll({
            where: {
                shopping_cart_id: shoppingCart.shopping_cart_id,
            }
        }).catch(function(errors){
            console.log(errors);
        });

        // Actualización información carrito
        let newShoppingCart = await db.ShoppingCart.findOne({
            where: {
                user_id: req.session.userLogged.user_id,
            }
        }).catch(function(errors){
            console.log(errors);
        });

        // Productos destacados
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

        return res.render('web/productCart',{
            currentProducts,
            currentProductsCart,
            newShoppingCart,
            featuredProducts
        });
    },

    // Eliminación de productos
    shoppingCartDelete: async(req, res) =>{
        
        let  idProduct = req.body.id;

        // Carrito actual desde base de datos
        let shoppingCart = await db.ShoppingCart.findOne({
            where: {
                user_id: req.session.userLogged.user_id,
            }
        }).catch(function(errors){
            console.log(errors);
        });

        // Extracción del total en el carrito existente en base de datos
        let total = Number(shoppingCart.total);

        // Almacenamiento del producto a ser eliminado
        let productToBeDeleted = await db.Product.findOne({
            where: {
                product_id: idProduct,
            },
        }).catch(function(errors){
            console.log(errors);
        });

        // Actualización del total del carrito
        total -= Number(productToBeDeleted.price);

        let updatedCart = await db.ShoppingCart.update({
            total: total,
        }, {
            where: {
                user_id: req.session.userLogged.user_id,
            }
        }).catch(function(errors){
            console.log(errors);
        }); 
    
        // Eliminación del producto
        let deletedProduct = await db.ProductShoppingCart.destroy({
            where: {
                product_id: idProduct,
            }
        }).catch(function(errors){
            console.log(errors);
        });

        // Información de los productos en el carrito
        let currentProducts = await db.Product.findAll({
            include: [{
                association: 'shoppingCarts',
                where: {
                    shopping_cart_id: shoppingCart.shopping_cart_id,
                }
            }]
        }).catch(function(errors){
                console.log(errors);
        });
        
        // Detalle de los productos en el carrito (cantidad y total parcial)
        let currentProductsCart = await db.ProductShoppingCart.findAll({
            where: {
                shopping_cart_id: shoppingCart.shopping_cart_id
            }
        }).catch(function(errors){
                console.log(errors);
        });

        // Actualización información carrito
        let newShoppingCart = await db.ShoppingCart.findOne({
            where: {
                user_id: req.session.userLogged.user_id,
            }
        }).catch(function(errors){
            console.log(errors);
        });
        
        // Productos destacados
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
        
        return res.render('web/productCart',{
            currentProducts,
            currentProductsCart,
            newShoppingCart,
            featuredProducts
        });
    }
};

module.exports = mainController;