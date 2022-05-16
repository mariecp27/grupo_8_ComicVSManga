module.exports = (sequelize, dataTypes) => {
    
    let alias = 'User';
    
    let cols = {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user: {
            type: dataTypes.STRING(10),
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        image: {
            type: dataTypes.STRING(50),
            allowNull: false,
            defaultValue: "default.png",
        },
        user_type_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
    };

    let config = {
        tableName: 'users',
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {

        User.hasMany(models.UserType, {
            as: 'usersTypes',
            foreignKey: 'user_type_id'
        });

        User.belongsTo(models.ShoppingCart, {
            as: 'shoppingCart',
            foreignKey: 'user_id'
        });
    }

    return User;
};