const fs = require('fs');
const {json} = require('express');
const path = require('path');
const db = require('../database/models');

const adminController = {
    index : async (req, res) => {

      
         try
              { //Productos de la base de datos de SQL
                const products = await db.Product.findAll({

                  include: ["categories", "subcategories", "languages", 'users'] //Se incluye todo por referencia
                
                });
              
        
              return res.render('admin/adminInterface', {products}); // Se envía "products" a la vista
              } catch (error){
                console.log(error);
              }

      
        
    }
}

module.exports = adminController;