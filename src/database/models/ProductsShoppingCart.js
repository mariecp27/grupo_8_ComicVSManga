module.exports = (sequelize, dataTypes) => {
    
    let alias = 'ProductShoppingCart';
    
    let cols = {
        product_category_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        shopping_cart_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        total: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    };

    let config = {
        tableName: 'products_shopping_cart',
        timestamps: false
    }

    const ProductShoppingCart = sequelize.define(alias, cols, config);

    ProductShoppingCart.associate = function (models) {

        ProductShoppingCart.hasMany(models.ShoppingCart, {
            as: 'shoppingCartsP',
            foreignKey: 'shopping_cart_id',
        });

        ProductShoppingCart.hasMany(models.Product, {
            as: 'productsP',
            foreignKey: 'product_id',
        });
    }

    return ProductShoppingCart;
};