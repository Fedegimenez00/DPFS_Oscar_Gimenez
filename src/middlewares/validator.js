
const {check} = require('express-validator');

const loginValidator = [
    //Nombre de usuario
    check('name')
    .notEmpty()
    .withMessage('Debes ingresar un nombre de usuario')
    .bail(),

    //Contraseña
    check('password')
    .notEmpty()
    .withMessage('Debes ingresar una contraseña')
    .bail()
    .isLength({ min: 5})
    .withMessage('La contraseña debe tener al menos 5 caracteres'),];

const registerValidator = [

]

module.exports = { loginValidator, registerValidator }; 