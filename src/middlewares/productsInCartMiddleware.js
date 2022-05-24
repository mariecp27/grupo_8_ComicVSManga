const db = require('../database/models');

async function productCartMiddleware(req, res, next) {

    res.locals.counter = 0;

	if (req.session.userLogged ) {
        let shoppingCart = await db.ShoppingCart.findAll({
            where: {
                user_id: req.session.userLogged.user_id,
            }
        }).catch(function(errors){
            console.log(errors);
        });

        if(shoppingCart.length > 0){
            let idShoppingCart = shoppingCart[0].dataValues.shopping_cart_id;

            let currentCart = await db.ProductShoppingCart.findAll({
                where: {
                    shopping_cart_id: idShoppingCart,
                }
            }).catch(function(errors){
                console.log(errors);
            });
    
            if(currentCart){
                for(let i = 0; i < currentCart.length; i++){
                    res.locals.counter++;
                }
            }
        }
	}

	next();
}

module.exports = productCartMiddleware;