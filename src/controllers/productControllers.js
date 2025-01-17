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
        const id = req.query.id; // Recibir el ID desde la solicitud
        res.render('partials/itemVideos', { id }); // Asegúrate del nombre y ubicación del archivo
      },
};

module.exports = productController;