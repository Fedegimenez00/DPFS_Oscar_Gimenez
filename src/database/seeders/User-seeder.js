module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          name: "Neron",
          email: "mail@mail.com",
          password: '$2b$10$hcAYB97yFrHwzthDfZVZROQSqNocLkQLIj7Lu79gD.N4olP0Qt0Wa',
          avatar: "avatar-1745508074555.svg",
          role: 0,
          description: "Esta es una descripción",
          firstName: 'Jhon',
          lastName: 'Smith',
          headline: 'Experto en codear',
        
        },
        {
            id: 2,
            name: "Admin",
            email: "correo@correo.com",
            password: '$2b$10$hcAYB97yFrHwzthDfZVZROQSqNocLkQLIj7Lu79gD.N4olP0Qt0Wa',
            avatar: "avatar-1745434662847.png",
            role: 1,
            description: "Esta es una descripción",
            firstName: 'Armin',
            lastName: 'Jaeger',
            headline: 'Experto en administrar',
          
          },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};