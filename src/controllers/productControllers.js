const path = require('path');
const fs = require('fs');

const productsPath = path.resolve(__dirname, '../database/products.json');

const productController = {
  //Muestra el detalle del producto dentro del JSON, usando de referencia el id
    show : (req, res) => {
      let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
      let myProduct = products.find(product => product.courseid === parseInt(req.params.courseid, 10));

      
    if (!myProduct) {
      return res.status(404).send("Producto no encontrado");
  }
        res.render(path.resolve(__dirname, '../views/products/productDetail'), {myProduct},);
    },


    create : (req, res) =>{
      let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

        return res.render('products/productAdd');
    },

//Parsea el Json, extrae el último objeto, recibe el nuevo producto generado por el formulario de
// create, pushea el nuevo producto y convierte el nuevo archivo en un JSON
    save : (req, res) =>{
      let user = req.session.userLogged;
      let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
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
        courseimage: req.file?.filename || 'default.png',
        price: req.body.price,
        rating: 0,
        reviews: 0,
        timesBought: 0,
        dateCreated: Date.now(),
        author: user.username
      }
           
    products.push(newProduct);
    let newProductSave = JSON.stringify(products, null, 2);
    fs.writeFileSync(productsPath, newProductSave, 'utf-8');
    //redirecciona a una ruta deseada
    res.redirect('/');
    },

    //Muestra desde la página de edición, los datos del JSON
    edit : (req,res) =>{
      let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
      const productId = req.params.courseid;
      let productEdit = products.find(product=> product.courseid == productId);
      res.render(path.resolve(__dirname, '../views/products/productEdit'), {productEdit});
    },

    update: (req, res) => {
      let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
      let courseid = parseInt(req.params.courseid);
    
      // Buscamos el producto original
      let productToUpdate = products.find(product => product.courseid === courseid);
    
      if (!productToUpdate) {
        return res.status(404).send("Producto no encontrado");
      }
    
      // Imagen: si no hay nueva, se mantiene la anterior
      let oldImage = req.file ? req.file.filename : productToUpdate.courseimage;
    
      // Creamos el objeto actualizado manteniendo lo que no viene del form
      let updatedProduct = {
        ...productToUpdate, // trae todo: author, reviews, etc.
        coursetitle: req.body.coursetitle,
        coursesubtitle: req.body.coursesubtitle,
        coursedescription: req.body.coursedescription,
        lang: req.body.lang,
        category: req.body.category,
        subcategory: req.body.subcategory,
        courseimage: oldImage,
        price: req.body.price
        // no tocamos rating, reviews, author ni dateCreated
      };
    
      // Reemplazamos el producto viejo con el nuevo en el array
      let updatedProducts = products.map(product =>
        product.courseid === courseid ? updatedProduct : product
      );
    
      fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2), 'utf-8');
    
      res.redirect('/');
    },
    

    destroy: (req, res) => {
  
      // 1. Leer productos
      let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
  
      // 2. Convertir ID a número
      const productDeleteId = Number(req.params.courseid);
  
      // 3. Buscar el producto a eliminar
      const productToDelete = products.find(product => product.courseid === productDeleteId);
  
      // 4. Si existe y su imagen no es "default.png", la eliminamos del sistema
      if (productToDelete && productToDelete.courseimage !== 'default.png') {
          const imagePath = path.join(__dirname, '../public/database/images/courses', productToDelete.courseimage);
          if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
          }
      }
  
      // 5. Filtrar el curso fuera del array
      const productsFinal = products.filter(product => product.courseid !== productDeleteId);
  
      // 6. Guardar la nueva versión del JSON
      let productsSaved = JSON.stringify(productsFinal, null, 2);
      fs.writeFileSync(productsPath, productsSaved);
  
      // 7. Redirigir
      res.redirect('/profile/create');
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
      let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

      return res.render('products/products', {products}); // Aquí enviamos "products" a la vista

      
    }
      
    
};

module.exports = productController;