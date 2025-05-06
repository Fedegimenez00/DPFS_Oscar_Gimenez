const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const productsPath = path.resolve(__dirname, '../database/products.json');

const db = require('../database/models');
const { Op } = require("sequelize");

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
      const resultValidation = validationResult(req);

      const categories = await db.Category.findAll()
      const subcategories = await db.Subcategory.findAll();
      const languages = await db.Language.findAll();
      
      if (resultValidation.isEmpty()) {
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
  } else {
    return res.render("products/productAdd", {
      errors: resultValidation.mapped(),
      old: req.body,
      categories,
      subcategories,
      languages
    });
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
    const resultValidation = validationResult(req);

    const categories = await db.Category.findAll()
    const subcategories = await db.Subcategory.findAll();
    const languages = await db.Language.findAll();
    
    if (resultValidation.isEmpty()) {
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

  } else {
    return res.render("products/productAdd", {
      errors: resultValidation.mapped(),
      old: req.body,
      categories,
      subcategories,
      languages
    });
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
        try {
          // Se obtienen los productos
          const products = await db.Product.findAll({
            include: ["categories", "subcategories", "languages", "users"]
          });
      
          // Se obtienen las categorías
          const categories = await db.Category.findAll();

          // Se obtienen las subcategorías
          const subcategories = await db.Subcategory.findAll();
      
          //Se envian a la vista estas variables
          return res.render('products/products', {
            products,
            categories,
            subcategories,
            isSearch: false,
            selectedCategory: null,
            selectedSubcategory: null 
          });
        } catch (error) {
          console.log(error);
          res.status(500).send("Error cargando catálogo");
        }
      },

    

      search: async (req, res) => {
        try {
          const { query, category, subcategory } = req.query;
          let filters = {};
      
          if (query) {
            filters.title = { [Op.like]: `%${query}%` };
          }
          if (category) {
            filters.category_id = category;
          }
          if (subcategory) {
            filters.subcategory_id = subcategory;
          }
      
          const products = await db.Product.findAll({
            where: filters,
            include: ["categories", "subcategories", "languages", "users"]
          });
      
          const categories = await db.Category.findAll({
            attributes: ['id', 'name', 'catalogWallpaper']
          });
          const subcategories = await db.Subcategory.findAll();
          const isSearch = Boolean(query || category || subcategory);

      
          res.render('products/products', {
            products,
            categories,
            subcategories,
            searchQuery: query,
            selectedCategory: category,
            selectedSubcategory: subcategory,
            isSearch
          });
        } catch (error) {
          console.log(error);
        }
      }

      
    }
      
    


module.exports = productController;
