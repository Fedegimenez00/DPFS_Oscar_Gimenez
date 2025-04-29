
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
        "products",
        [
          {
            id: 1,
            title: "Producto de experimento",
            subtitle: "Subtítulo ejemplar",
            language_id: 1,
            category_id: 3,
            subcategory_id: 2,
            description: "Esta es una descripción",
            price: 150,
            available: 1,
            image: 'course1744594828633',
            rating: 0,
            reviews: 0,
            timesBought: 0,
            user_id: 1,
          },
        ],
        {}
      );
    },
  
    async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("products", null, {});
    },
  };