module.exports = (sequelize, DataTypes) => {
    const alias = 'Product'
    const cols = {
       title: {
        type: DataTypes.STRING(255),
        validate: {
            min: 3 //Mínimo de 3 caracteres
        }
    },
        subtitle: {
            type: DataTypes.STRING
        },
        language_id: { //Clave foránea que conecta con la tabla de lenguajes
            type: DataTypes.INTEGER(11)
        },
        category_id: { //Clave foránea que conecta con la tabla de categorías
            type: DataTypes.INTEGER(11)
        },
        description: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER(11)
        },
        available: {
            type: DataTypes.BOOLEAN
        },
        image: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.INTEGER(3)
        },
        reviews: {
            type: DataTypes.INTEGER
        },
        timesBought: {
            type: DataTypes.INTEGER
        },
       }
    
    const config = {
        tableName: 'products',
        paranoid: true
    }
    const Product = sequelize.define(alias, cols, config)

    Product.associate = (model) => {
        Product.belongsTo(model.Category, { //Un producto tiene una categoría
            as: 'categories',
            foreignKey: 'category_id' 
        })
    }

    Product.associate = (model) => {
        Product.belongsTo(model.Language, { //Un producto tiene un lenguaje (Por ahora)
            as: 'languages',
            foreignKey: 'language_id' 
        })
    }

    Product.associate = (model) => {
        Product.belongsTo(model.User, { //Un producto tiene un usuario
            as: 'users',
            foreignKey: 'user_id' 
        })
    }

    return Product
}

