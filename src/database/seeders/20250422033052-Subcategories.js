'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "subcategories",
      [
        
        // Seguridad Ofensiva
        { name: "Hacking de Aplicaciones Web", category_id: 2 },
        { name: "Pentesting", category_id: 2 },
        { name: "Explotación de vulnerabilidades", category_id: 2 },
        
        // Seguridad Defensiva
        { name: "Fortificación de Redes", category_id: 3 },
        { name: "Respuesta a Incidentes", category_id: 3 },
        { name: "Análisis de Malware", category_id: 3 },
        
        // Seguridad de Nube
        { name: "Gestión de Identidades y Accesos (IAM)", category_id: 4 },
        { name: "Arquitectura Segura en la Nube", category_id: 4 },
        { name: "Respuestas a Incidentes en Cloud", category_id: 4 },

        // Ingeniería Social
        { name: "Técnicas de Ingeniería Social", category_id: 5 },
        { name: "Concientización y Educación", category_id: 5 },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("subcategories", null, {});
  }
};
