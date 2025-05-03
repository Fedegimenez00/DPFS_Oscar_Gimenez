'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "subcategories",
      [
        
        // Seguridad Ofensiva
        { name: "Hacking de Aplicaciones Web",
          description: 'Descubre y explota fallos en aplicaciones web',
          category_id: 2 
        },
        { name: "Pentesting", 
          description: 'Evalúa sistemas simulando ataques reales',
          category_id: 2 
        },
        { name: "Explotación de vulnerabilidades", 
          description: 'Diseña y ejecuta exploits avanzados',
          category_id: 2 
        },
        
        // Seguridad Defensiva
        { name: "Fortificación de Redes", 
          description: 'Protege sistemas mediante configuraciones seguras',
          category_id: 3 
        },
        { name: "Respuesta a Incidentes", 
          description: 'Actúa ante ciberataques en tiempo real',
          category_id: 3 
        },
        { name: "Análisis de Malware", 
          description: 'Detecta y desarma software malicioso',
          category_id: 3 
        },
        
        // Seguridad de Nube
        { name: "Gestión de Identidades y Accesos (IAM)", 
          description: 'Controla accesos y permisos en la nube',
          category_id: 4 
        },
        { name: "Arquitectura Segura en la Nube", 
          description: 'Diseña infraestructuras cloud resistentes',
          category_id: 4 
        },
        { name: "Respuestas a Incidentes en Cloud", 
          description: 'Mitiga amenazas específicas de entornos cloud',
          category_id: 4 
        },

        // Ingeniería Social
        { name: "Técnicas de Ingeniería Social", 
          description: 'Aprende estrategias de manipulación y engaño',
          category_id: 5 
        },
        { name: "Concientización y Educación", 
          description: 'Fortalece seguridad con capacitación preventiva',
          category_id: 5 
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("subcategories", null, {});
  }
};
