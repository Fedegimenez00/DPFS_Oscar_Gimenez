const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const indexController = {
    index : async (req, res) => {
        try {
       const productsDB = db.Product.findAll()
        console.log(productsDB);

        } catch (error) {
            
        }
        return res.render('index');
    req.session.horaDeVisita = Date.now //?
    }
};

module.exports = indexController;