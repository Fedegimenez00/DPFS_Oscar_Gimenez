'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
    "languages",
      [
        { name: "Español"},
        { name: "Inglés"},
        { name: "Portugués" },
        { name: "Italiano" },
        { name: "Francés"},
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("languages", null, {});

  }
};
