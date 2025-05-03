const fs = require('fs');
const {json} = require('express');
const path = require('path');
const db = require('../database/models');

const adminController = {
    index : async (req, res) => {

        /*let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/products.json')));
        res.render(path.resolve(__dirname, '../views/admin/adminInterface'), {products});*/
         try
              { //Productos de la base de datos de SQL
                const products = await db.Product.findAll({

                  include: ["categories", "subcategories", "languages", 'users'] //Se incluye todo por referencia
                
                });
              
        
              return res.render('admin/adminInterface', {products}); // Aquí enviamos "products" a la vista
              } catch (error){
                console.log(error);
              }

        // return res.render('admin/adminInterface');
        
    }
}

module.exports = adminController;