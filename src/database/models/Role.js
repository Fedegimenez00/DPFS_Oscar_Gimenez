module.exports = (sequelize, DataTypes) => {
    const alias = 'Role'
    const cols = {
       name: {
        type: DataTypes.STRING(255),
        
    },
        
       }
    
    const config = {
        tableName: 'roles',
        timestamps: false
    }
    const Role = sequelize.define(alias, cols, config)

    return Role;
}