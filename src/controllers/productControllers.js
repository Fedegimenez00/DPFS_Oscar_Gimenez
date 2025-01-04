const productController = {
    show : (req, res) => {
        return res.render('products/productDetail');
    },

    create : (req, res) =>{
        return res.render('products/productAdd');
    },

    cart : (req, res) =>{
        return res.render('products/productCart');
    }
};

module.exports = productController;