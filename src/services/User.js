const fs = require("fs");
const path = require("path");

module.exports = {
  filePath: path.join(__dirname, "../database/users.json"),
  getData: function () {
    return JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
  },
  findAll: function () {
    return this.getData();
  },
  findById: function (id) {
    return this.getData().find((user) => user.id == id);
  },
  findByField: function (field, text) {
    return this.getData().find((user) => user[field] == text);
  },
};