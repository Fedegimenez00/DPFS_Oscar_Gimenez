module.exports = (sequelize, DataTypes) => {
    const alias = 'Transaction';
  
    const cols = {
    
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      total: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING
      },
      paymentMethod: {
        type: DataTypes.STRING,
        default: 'Débito',
      },
    };
    
 
    
    
    
    
    const config = {
      tableName: 'transactions',
    }

  
    const Transaction = sequelize.define(alias, cols, config);
  
    Transaction.associate = (models) => {
      Transaction.belongsTo(models.User, {
        as: 'users',
        foreignKey: 'user_id'
      })
    
    Transaction.belongsToMany(models.Product, {
      through: 'TransactionProduct',
      foreignKey: 'transaction_id',
      otherKey: 'product_id'
    });
      

     };
  
    return Transaction;
  };