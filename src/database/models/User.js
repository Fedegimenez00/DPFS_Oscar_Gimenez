module.exports = (sequelize, DataTypes) => {
    const alias = 'User'
    const cols = {
       name: {
        type: DataTypes.STRING(255),
        validate: {
            unique: true,
            min: 3 //Mínimo de 3 caracteres
        }
    },
        email: {
        type: DataTypes.STRING(255),
        validate: {
           unique: true,
        }
        },
        password: {
            type: DataTypes.STRING(100)
        },
        avatar: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING(255)
        },
        secondName: {
           type: DataTypes.STRING(255)
        },
        headline: {
           type: DataTypes.STRING(255)
        }
        

       
    }
    const config = {
        tableName: 'users',
        timestamps: false //No aparecen los tiempos de creación, eliminación, etc.
        //paranoid: true Se elimina por privacidad del usuario
    }
    const User = sequelize.define(alias, cols, config)

    return User;
}

