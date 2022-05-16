module.exports = (sequelize, dataTypes) => {
    
    let alias = 'UserType';
    
    let cols = {
        user_type_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_type: {
            type: dataTypes.STRING(15),
            allowNull: false
        },
    };

    let config = {
        tableName: 'users_types',
        timestamps: false
    }

    const UserType = sequelize.define(alias, cols, config);

    UserType.associate = function (models) {

        UserType.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_type_id'
        });
    }

    return UserType;
};