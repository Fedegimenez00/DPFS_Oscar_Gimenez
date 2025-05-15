module.exports = (sequelize, DataTypes) => {
    const alias = 'TransactionProduct';
  
    const cols = {
      transaction_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'transactions',
            key: 'id'
          }
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'products',
            key: 'id'
          }
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      priceAtPurchase: {
        type: DataTypes.DECIMAL,
      },

     
    
    }
   
    
    
    const config = {
      tableName: 'transactionproducts',
      timestamps: false,
    };
  
    const TransactionProduct = sequelize.define(alias, cols, config);
  
    
      TransactionProduct.associate = (models) => {
        TransactionProduct.belongsTo(models.Transaction, {
          foreignKey: 'transaction_id',
          as: 'transaction'
        });
      
        TransactionProduct.belongsTo(models.Product, {
          foreignKey: 'product_id',
          as: 'product'
        });
      };
      

  
    return TransactionProduct;
      };