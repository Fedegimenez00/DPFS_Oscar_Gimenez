module.exports = (sequelize, DataTypes) => {
    const alias = 'Subcategory';
  
    const cols = {
      name: {
        type: DataTypes.STRING(255),
      },
      description: {
        type: DataTypes.STRING,
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        }
      }
    };
  
    const config = {
      tableName: 'subcategories',
      timestamps: false,
    };
  
    const Subcategory = sequelize.define(alias, cols, config);
  
    Subcategory.associate = (models) => {
      Subcategory.belongsTo(models.Category, {
        as: 'category',
        foreignKey: 'category_id'
      });
  
      Subcategory.hasMany(models.Product, {
        as: 'products',
        foreignKey: 'subcategory_id'
      });
    };
  
    return Subcategory;
  };
  