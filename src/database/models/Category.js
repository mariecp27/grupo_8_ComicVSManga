module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Category';
    
    let cols = {
        category_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
    };

    let config = {
        tableName: 'categories',
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models) {

        Category.belongsToMany(models.Product, {
            as: 'products',
            through: 'products_categories',
            foreignKey: 'category_id',
            otherKey: 'product_id',
            timestamps: false
        });
    }

    return Category;
};