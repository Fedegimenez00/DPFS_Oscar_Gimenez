const {check} = require('express-validator');

const loginValidator = [
    check('email')
    .notEmpty()
    .withMessage('Debes ingresar un email')
    .bail()
    .isEmail()
    .withMessage('El dato ingresado no corresponde a un email'),
    check('password')
    .notEmpty()
    .withMessage('Debes ingresar un password')
    .bail()
    .isLength({ min: 5})
    .withMessage('La contraseña debe tener al menos 5 carácteres'),
];

module.exports = { loginValidator };