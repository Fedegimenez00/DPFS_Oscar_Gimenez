module.exports = (sequelize, DataTypes) => {
    const alias = 'Language'
    const cols = {
       name: {
        type: DataTypes.STRING(255),
        
    },
        
       }
    
    const config = {
        tableName: 'languages',
        timestamps: false
    }
    const Language = sequelize.define(alias, cols, config)

    return Language;
}