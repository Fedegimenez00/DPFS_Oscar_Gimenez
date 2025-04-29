
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
    check("name")
    .notEmpty()
    .withMessage("Debes ingresar un nombre"),

    check("email")
      .notEmpty()
      .withMessage("Debes ingresar un email")
      .bail()
      .isEmail()
      .withMessage("El dato ingresado no corresponde a un email"),

    check("password")
    .notEmpty()
    .withMessage("Debes ingresar un password"),
]

module.exports = { loginValidator, registerValidator }; 