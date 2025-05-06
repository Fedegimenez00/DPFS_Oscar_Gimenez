const path = require('path')
module.exports = {
    development: {
      username: "gimenez", //xampp
      password: 'DigitalHouse1234',
      database: "gimenez_zerotrustdb",
      host: "mysql-gimenez.alwaysdata.net",
       dialect: "mysql",  
    /*  dialect: "sqlite", //Elemento temporal de desarrollo (sqlite3)
      storage: path.resolve(__dirname, '../../../databaseSQLite/zerotrust_db.sqlite')
   */ },
    test: {
        username: "gimenez", //xampp
      password: 'DigitalHouse1234',
      database: "gimenez_zerotrustdb",
      host: "mysql-gimenez.alwaysdata.net",
       dialect: "mysql",  
        /*
      username: "root", //xamp
      password: null,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "mysql", */
     /* dialect: "sqlite", //Elemento temporal de desarrollo
      storage: path.resolve(__dirname, '../../../databaseSQLite/zerotrust_db.sqlite')
    */
      },
    production: {
        username: "gimenez", //xampp
      password: 'DigitalHouse1234',
      database: "gimenez_zerotrustdb",
      host: "mysql-gimenez.alwaysdata.net",
       dialect: "mysql",  
     /* username: "root", //xampp
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "mysql", 
      */
     /* dialect: "sqlite", //Elemento temporal de desarrollo
      storage: path.resolve(__dirname, '../../../databaseSQLite/zerotrust_db.sqlite') 
    */
      },
  };

  // npx sequelize-cli db:create --config src/database/config/config.js (Método antiguo de creación de base de datos)
