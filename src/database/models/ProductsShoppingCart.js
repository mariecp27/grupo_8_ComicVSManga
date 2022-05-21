module.exports = (sequelize, dataTypes) => {
    
    let alias = 'ProductShoppingCart';
    
    let cols = {
        product_shopping_cart_id: {
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
        product_total: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    };

    let config = {
        tableName: 'products_shopping_cart',
        timestamps: false
    }

    const ProductShoppingCart = sequelize.define(alias, cols, config);

    return ProductShoppingCart;
};