const fs = require("fs");
const path = require("path");

//Métodos de User que pueden ser importados a usercontrollers

module.exports = {
  filePath: path.join(__dirname, "../database/users.json"), //Dirección de la base de datos
  getData: function () { //Lectura de la base de datos parseada
    return JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
  },
  findAll: function () { //Trae todos los elementos, usando el método anterior
    return this.getData();
  },
  findById: function (id) { //Búsqueda del elemento por medio del id
    return this.getData().find((user) => user.id == id);
  },
  findByField: function (field, text) { //Busca por el campo especificado. Sea email, username, etc.
    return this.getData().find((user) => user[field] == text);
  },
};