const path = require('path');
const fs = require('fs');


const productController = {
  //Muestra el detalle del producto dentro del JSON, usando de referencia el id
    show : (req, res) => {
      let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/products.json')));
      let myProduct = products.find(product => product.courseid === parseInt(req.params.courseid, 10));

      
    if (!myProduct) {
      return res.status(404).send("Producto no encontrado");
  }
        res.render(path.resolve(__dirname, '../views/products/productDetail'), {myProduct});
    },


    create : (req, res) =>{
      let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/products.json')));

        return res.render('products/productAdd');
    },

//Parsea el Json, extrae el último objeto, recibe el nuevo producto generado por el formulario de
// create, pushea el nuevo producto y convierte el nuevo archivo en un JSON
    save : (req, res) =>{
      let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/products.json')));
      let lastProduct = products.pop();
      products.push(lastProduct);
      let newProduct = {
        courseid: lastProduct.courseid +1,
        coursetitle: req.body.coursetitle,
        coursesubtitle: req.body.coursesubtitle,
        coursedescription: req.body.coursedescription,
        lang: req.body.lang,
        category: req.body.category,
        subcategory: req.body.subcategory,
        courseimage: req.file.filename,
        price: req.body.price,
      }
           
    products.push(newProduct);
    let newProductSave = JSON.stringify(products, null, 2);
    fs.writeFileSync(path.resolve(__dirname, '../database/products.json'), newProductSave);
    //redirecciona a una ruta deseada
    res.redirect('/admin');
    },

    //Muestra desde la página de edición, los datos del JSON
    edit : (req,res) =>{
      let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/products.json')));
      const productId = req.params.courseid;
      let productEdit = products.find(product=> product.courseid == productId);
      res.render(path.resolve(__dirname, '../views/products/productEdit'), {productEdit});
    },

    update : (req, res) =>{
      let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/products.json')));
      req.body.courseid = req.params.courseid;
      req.body.courseimage = req.file ? req.file.filename : req.body.oldImage;
      let productsUpdate = products.map(product =>{
        if(product.courseid == req.body.courseid){
          return product = req.body;
        }
        return product;
      })
      let productUpdate = JSON.stringify(productsUpdate, null, 2);
      fs.writeFileSync(path.resolve(__dirname, '../database/products.json'), productUpdate)
      res.redirect('/admin');
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