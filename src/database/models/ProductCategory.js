module.exports = (sequelize, dataTypes) => {
    
    let alias = 'productsCategories';
    
    let cols = {
        product_category_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
    };

    let config = {
        tableName: 'products_categories',
        timestamps: false
    }

    const ProductCategory = sequelize.define(alias, cols, config);

    return ProductCategory;
};