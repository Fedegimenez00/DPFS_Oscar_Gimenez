const path = require('path');
const fs = require('fs');

function userLogged(req, res, next) {
   res.locals.isAdmin = false;

    if (req.session && req.session?.userLogged) { //Se usa el ? para preguntar si existe
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
        req.session?.userLogged.role == 'admin' ? (res.locals.isAdmin = true) : null;
    }

    
    if (req.session?.userLogged && req.cookies?.username) {
    let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));   
    let userToLogin = users.find(user => user.username == req.cookies.username);
    
    if (userToLogin) {
        delete userToLogin.password;
        req.session.userlogged = userToLogin;
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
        req.session?.userLogged.role == 'admin' ? (res.locals.isAdmin = true) : null;
    }
    }

    next();
}

module.exports = userLogged;