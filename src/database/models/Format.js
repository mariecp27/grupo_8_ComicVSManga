module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Format';
    
    let cols = {
        format_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        format: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
    };

    let config = {
        tableName: 'formats',
        timestamps: false
    }

    const Format = sequelize.define(alias, cols, config);

    Format.associate = function(models) {

        Format.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'format_id'
        });
    }


    return Format;
};