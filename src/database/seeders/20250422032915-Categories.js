'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        { name: "Fundamentos de la Ciberseguridad"},
        { name: "Seguridad Ofensiva" },
        { name: "Seguridad Defensiva" },
        { name: "Seguridad de Nube" },
        { name: "Ingeniería Social" },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  }
};
