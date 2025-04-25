const path = require('path');
const fs = require('fs');

const productsPath = path.resolve(__dirname, '../database/products.json');

const db = require('../database/models');

const productController = {
  //Mostraba el detalle del producto dentro del JSON, usando de referencia el id
  //Ahora muestra el producto dentro de JSON
    show: async (req, res) => {
      try
      { //Productos de la base de datos de SQL
      
        let myProduct = await db.Product.findByPk(req.params.id, {     //Filtra por la id
          include: ["categories", "subcategories", "languages", "users"],
        }); 
    //  let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
      //let myProduct = products.find(product => product.id /*courseid*/ === parseInt(req.params.id /*courseid*/, 10));

      
    if (!myProduct) {
      return res.status(404).send("Producto no encontrado");
  }
  //Renderiza el producto
        res.render(path.resolve(__dirname, '../views/products/productDetail'), {myProduct},);
     
      } catch (error){
        console.log(error);
      }
    
      },


    create : async (req, res) =>{
    //  let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
     const categories = await db.Category.findAll()
     const subcategories = await db.Subcategory.findAll();
     const languages = await db.Language.findAll();
        return res.render('products/productAdd', {categories, subcategories, languages});
    },

//Parsea el Json, extrae el último objeto, recibe el nuevo producto generado por el formulario de
// create, pushea el nuevo producto y convierte el nuevo archivo en un JSON
    save : async (req, res) =>{
      let user = req.session.userLogged;

      let newProduct = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        language_id: req.body.language,
        category_id: req.body.category,
        subcategory_id: req.body.subcategory,
        image: req.file?.filename || 'default.png',
        price: req.body.price,
        rating: 0,
        reviews: 0,
        timesBought: 0,
        available: true, // o ajustar si tenés un checkbox tipo "disponible"
        user_id: user.id
      };

      await db.Product.create(newProduct);
      /*
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
*/
    //Redirecciona a una ruta deseada
    if (user.role == 1) {
      return res.redirect('/admin');
    } else {
      return res.redirect('/profile/' + user.id + '/create');
    }

    },

    //Muestra desde la página de edición, los datos del JSON
    edit : async (req,res) =>{
      
     // const products = await db.Product.findAll()
    
        let productEdit = await db.Product.findByPk(req.params.id)
      //let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
      //const productId = req.params.courseid;
      
     // let productEdit = products.find(product=> product.courseid == productId);
      res.render(path.resolve(__dirname, '../views/products/productEdit'), {productEdit});
    
    },
  
  update: async (req, res) => {
  try {
    const user = req.session.userLogged;
    const productId = req.params.id;

    // Buscar producto original
    const productToUpdate = await db.Product.findByPk(productId);
    if (!productToUpdate) {
      return res.status(404).send("Producto no encontrado");
    }

    // Manejo de imagen
    const oldImage = productToUpdate.image;
    const newImage = req.file ? req.file.filename : oldImage;

    // Si se subió una nueva imagen y la anterior no era la default, se borra
    if (req.file && oldImage !== 'default.png') {
      const imagePath = path.join(__dirname, '../../public/database/images/courses/', oldImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Actualizar los datos
    const updatedProduct = {
      title: req.body.coursetitle,
      subtitle: req.body.coursesubtitle,
      description: req.body.coursedescription,
      language_id: req.body.lang,
      category_id: req.body.category,
      subcategory_id: req.body.subcategory,
      image: newImage,
      price: req.body.price,
    };

    await db.Product.update(updatedProduct, {
      where: { id: productId }
    });

    // Redirección según el rol
    if (user.role === 'admin' || user.role === 1) {
      return res.redirect('/admin');
    } else {
      return res.redirect('/profile/' + user.id + '/create');
    }

  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrió un error al actualizar el producto.");
  }
},


    update: (req, res) => {
      let user = req.session.userLogged;
      let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
      let courseid = parseInt(req.params.courseid);
    
      // Se busca el producto original por id
      let productToUpdate = products.find(product => product.courseid === courseid);
    
      if (!productToUpdate) {
        return res.status(404).send("Producto no encontrado");
      }
    
    // Comprueba si hay una nueva imagen
  let oldImage = productToUpdate.courseimage;
  let newImage = req.file ? req.file.filename : oldImage;

  // Si se subió una nueva imagen y la vieja no es la default, se elimina
  if (req.file && oldImage !== 'default.png') {
    const imagePath = path.join(__dirname, '../../public/database/images/courses/', oldImage);
    if (fs.existsSync(imagePath)) {

        fs.unlinkSync(imagePath);
       
    }
  }
    
      // Se crea el objeto actualizado
      let updatedProduct = {
        ...productToUpdate, // Spread Operator para traer elementos que no se deben modificar
        coursetitle: req.body.coursetitle,
        coursesubtitle: req.body.coursesubtitle,
        coursedescription: req.body.coursedescription,
        lang: req.body.lang,
        category: req.body.category,
        subcategory: req.body.subcategory,
        courseimage: newImage,
        price: req.body.price
        
      };
    
      // Reemplazo del producto/objeto viejo con el nuevo en el array
      let updatedProducts = products.map(product =>
        product.courseid === courseid ? updatedProduct : product
      );
    
      fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2), 'utf-8');
    
      //Redirecciona a una ruta deseada
    if (user.role =='admin') {
      return res.redirect('/admin');
    } else {
      return res.redirect('/profile/' + user.user_id + '/create');
    }
    },
    

    destroy: async (req, res) => {
      //[Borrado suave, lo saca de la vista de consulta]
      let user = req.session.userLogged;
/*
      (Opcional para otro caso)

      let productToDelete = await db.Product.findByPk(req.params.id)

      //Elimina imagen 
      if (productToDelete.image  !== 'default.png') {
        const imagePath = path.join(__dirname, '../../public/database/images/courses', productToDelete.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
*/
      const productDelete = await  db.Product.destroy({
          where : { 
           id: req.params.id 
         },
         });
      //let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
  
      // Convierte el ID a número
      //const productDeleteId = Number(req.params.courseid);
  
      // Busca el producto a eliminar
      
      //const productToDelete = products.find(product => product.courseid === productDeleteId);

    /*
    
     
      }
     */

      //Elimina el curso en base al id
   
      /*
      // Filtra el curso fuera del array
      const productsFinal = products.filter(product => product.courseid !== productDeleteId);
  
      // Guarda la nueva versión del JSON
      let productsSaved = JSON.stringify(productsFinal, null, 2);
      fs.writeFileSync(productsPath, productsSaved);
  */
      // Redirige según el rol
    if (user.role == 1) {
      return res.redirect('/admin');
    } else {
      return res.redirect('/profile/' + user.id + '/create');
    }
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
      
    catalog: async (req, res) => {
      //let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
      try
      { //Productos de la base de datos de SQL
        const products = await db.Product.findAll()
      

      return res.render('products/products', {products}); // Aquí enviamos "products" a la vista
      } catch {
        console.log(error);
      }
      
    }
      
    
};

module.exports = productController;
