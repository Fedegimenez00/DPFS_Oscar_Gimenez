const path = require('path');
const fs = require('fs');

const productsPath = path.resolve(__dirname, '../database/products.json');

const db = require('../database/models');

const productController = {
  
    show: async (req, res) => {
      try
      { //Productos de la base de datos de SQL
      
        let myProduct = await db.Product.findByPk(req.params.id, {     //Filtra por la id
          include: ["categories", "subcategories", "languages", "users"],
        }); 
      
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
     const categories = await db.Category.findAll()
     const subcategories = await db.Subcategory.findAll();
     const languages = await db.Language.findAll();
        return res.render('products/productAdd', {categories, subcategories, languages});
    },


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
        available: true, // o ajustarlo si se tiene un checkbox disponible
        user_id: user.id
      };

      await db.Product.create(newProduct);
    

    //Redirecciona a una ruta deseada
    if (user.role == 1) {
      return res.redirect('/admin');
    } else {
      return res.redirect('/profile/' + user.id + '/create');
    }

    },

    edit : async (req,res) =>{
      const categories = await db.Category.findAll()
      const subcategories = await db.Subcategory.findAll();
      const languages = await db.Language.findAll();
    
        let productEdit = await db.Product.findByPk(req.params.id)
     
       res.render(path.resolve(__dirname, '../views/products/productEdit'), 
       {productEdit, languages, categories, subcategories });
    
    },
  
  update: async (req, res) => {
    const user = req.session.userLogged;

    // Se busca el producto original por id
    let productToUpdate = await db.Product.findByPk(req.params.id);
    
    if (!productToUpdate) {
      return res.status(404).send("Producto no encontrado");
    }

    // Comprueba si hay una nueva imagen
    let oldImage = productToUpdate.image;
    let newImage = req.file ? req.file.filename : oldImage;

    // Si se subió una nueva imagen y la vieja no es la default, se elimina
    if (req.file && oldImage !== 'default.png') {
      let imagePath = path.join(__dirname, '../../public/database/images/courses/', oldImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Actualizan los datos del objeto
       
    await db.Product.update( {
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      language_id: req.body.language,
      category_id: req.body.category,
      subcategory_id: req.body.subcategory,
      image: newImage,
      price: req.body.price, 
      }, {
      where: { id: productToUpdate.id }
    });

    // Redirección según el rol
    if (user.role == 1) {
      return res.redirect('/admin');
    } else {
      return res.redirect('/profile/' + user.id + '/create');
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
       //Elimina el curso en base al id
      const productDelete = await  db.Product.destroy({
          where : { 
           id: req.params.id,
         },
         });

         console.log("prodBorrado", productDelete); 

   
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
        const type = req.query.type; // Recibe el type desde la solicitud
        const id = req.query.id; // Recibe el ID desde la solicitud
      
        if (!type) {
          return res.status(400).send('Tipo de partial no especificado');
        }
      
        res.render(`partials/${type}`, { id }); // Renderizado del partial específico
      },
      
    catalog: async (req, res) => {
      try{
      //Productos de la base de datos de SQL
        const products = await db.Product.findAll({
          include: ["categories", "subcategories", "languages", "users"]
        }
        )
      

      return res.render('products/products', {products}); // Se envía "products" a la vista
      } catch (error) {
        console.log(error);
      }
      
    }
      
    
};

module.exports = productController;
