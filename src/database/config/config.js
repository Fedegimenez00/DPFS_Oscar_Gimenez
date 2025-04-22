const path = require('path')
module.exports = {
    development: {
    /*  username: "root",
      password: null,
      database: "zerotrust_db",
      host: "127.0.0.1",
       dialect: "mysql", */
      dialect: "sqlite", //Elemento temporal de desarrollo
      storage: path.resolve(__dirname, '../../../databaseSQLite/zerotrust_db.sqlite')
    },
    test: {
    /*  username: "root",
      password: null,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "mysql", */
      dialect: "sqlite", //Elemento temporal de desarrollo
      storage: path.resolve(__dirname, '../../../databaseSQLite/zerotrust_db.sqlite')
    },
    production: {
    /*  username: "root",
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "mysql", */
      dialect: "sqlite", //Elemento temporal de desarrollo
      storage: path.resolve(__dirname, '../../../databaseSQLite/zerotrust_db.sqlite')
    },
  };