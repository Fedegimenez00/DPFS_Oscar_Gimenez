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

    Language.associate = (model) => {
        Language.hasMany(model.Product, { //Un idioma tiene muchos productos
            as: 'products',
            foreignKey: 'language_id' 
        })
    }

    return Language;
}