module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Product';
    
    let cols = {
        product_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        author: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        format_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        pages: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        featured: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
        on_sale: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
        discount: {
            type: dataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    };

    let config = {
        tableName: 'products',
        timestamps: false,
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {

        Product.belongsToMany(models.ShoppingCart, {
            as: 'shoppingCarts',
            through: 'products_shopping_cart',
            foreignKey: 'product_id',
            otherKey: 'shopping_cart_id',
            timestamps: false
        });

        Product.belongsTo(models.Format, {
            as: 'formats',
            foreignKey: 'format_id'
        });

        Product.belongsToMany(models.Category, {
            as: 'categories',
            through: 'products_categories',
            foreignKey: 'product_id',
            otherKey: 'category_id',
            timestamps: false
        });
    }

    return Product;
};