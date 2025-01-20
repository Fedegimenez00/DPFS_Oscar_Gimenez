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
    /*
    getPartial: (req, res) => {
        const id = req.query.id; // Recibir el ID desde la solicitud
        res.render('partials/itemVideos', { id }); // Asegúrate del nombre y ubicación del archivo
      },*/
      getPartial: (req, res) => {
        const type = req.query.type;
        const id = req.query.id;
      
        if (!type) {
          return res.status(400).send('Tipo de partial no especificado');
        }
      
        res.render(`partials/${type}`, { id });
      }
      
    
};

module.exports = productController;