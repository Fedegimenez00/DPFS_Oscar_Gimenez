module.exports = (sequelize, DataTypes) => {
    const alias = 'Category'
    const cols = {
       name: {
        type: DataTypes.STRING(255),
        
    },
        
       }
    
    const config = {
        tableName: 'categories',
        timestamps: false,
    }
    const Category = sequelize.define(alias, cols, config)

    Category.associate = (model) => {
        Category.hasMany(model.Product, { //Una categoría tiene muchos productos
            as: 'products',
            foreignKey: 'category_id' 
        })

        Category.hasMany(model.Subcategory, { //Una categoría tiene varias subcategorías
            as: 'subcategories',
            foreignKey: 'category_id'
          });
    }

    return Category;
}

