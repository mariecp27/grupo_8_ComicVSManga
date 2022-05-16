module.exports = (sequelize, dataTypes) => {
    
    let alias = 'ShoppingCart';
    
    let cols = {
        shopping_cart_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        total: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    };

    let config = {
        tableName: 'shopping_cart',
        timestamps: false
    }

    const ShoppingCart = sequelize.define(alias, cols, config);

    ShoppingCart.associate = function (models) {

        ShoppingCart.hasMany(models.User, {
            as: 'users',
            foreignKey: 'user_id'
        });

        ShoppingCart.belongsToMany(models.Product, {
            as: 'products',
            through: 'products_shopping_cart',
            foreignKey: 'shopping_cart_id',
            otherKey: 'product_id',
            timestamps: false
        });
    }

    return ShoppingCart;
};