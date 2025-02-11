const fs = require('fs');
const {json} = require('express');
const path = require('path');

const adminController = {
    index : (req, res) =>{
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/products.json')));
        res.render(path.resolve(__dirname, '../views/admin/adminInterface'), {products});

        // return res.render('admin/adminInterface');
        
    }
}

module.exports = adminController;