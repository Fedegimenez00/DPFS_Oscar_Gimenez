const productController = {
    show : (req, res) => {
        return res.render('products/productDetail');
    },

    create : (req, res) =>{
        return res.render('products/productAdd');
    },

    cart : (req, res) =>{
        return res.render('products/productCart');
    },

      getPartial: (req, res) => {
        const type = req.query.type; // Recibir el type desde la solicitud
        const id = req.query.id; // Recibir el ID desde la solicitud
      
        if (!type) {
          return res.status(400).send('Tipo de partial no especificado');
        }
      
        res.render(`partials/${type}`, { id }); // Renderizado del partial específico
      },
      
    catalog: (req, res) => {
      return res.render('products/products');
    }
      
    
};

module.exports = productController;