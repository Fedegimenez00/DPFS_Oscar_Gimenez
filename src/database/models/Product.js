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
        subcategory_id: { //Clave foránea que conecta con la tabla de subcategorías
            type: DataTypes.INTEGER(11)
        },
        description: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER(11)
        },
        available: {
            type: DataTypes.BOOLEAN,
            
        },
        image: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.INTEGER(3),
            toDefaultValue: 0
        },
        reviews: {
            type: DataTypes.INTEGER,
            toDefaultValue: 0
        },
        timesBought: {
            type: DataTypes.INTEGER,
            toDefaultValue: 0
        },
       }
    
    const config = {
        tableName: 'products',
        paranoid: true
    }
    const Product = sequelize.define(alias, cols, config)

    Product.associate = (models) => {
        Product.belongsTo(models.Category, {
          as: 'categories',
          foreignKey: 'category_id'
        });
      
        Product.belongsTo(models.Subcategory, {
          as: 'subcategories',
          foreignKey: 'subcategory_id'
        });
      
        Product.belongsTo(models.Language, {
          as: 'languages',
          foreignKey: 'language_id'
        });
      
        Product.belongsTo(models.User, {
          as: 'users',
          foreignKey: 'user_id'
        });
      };      

    return Product
}

