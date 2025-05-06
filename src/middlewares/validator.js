
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
    .isLength({ min: 8})
    .withMessage('La contraseña debe tener al menos 8 caracteres'),];

const registerValidator = [
    check("name")
    .notEmpty()
    .withMessage("Debes ingresar un nombre de usuario")
    .isLength({ min: 5})
    .withMessage('El nombre de usuario debe tener al menos 5 caracteres'),

    check("email")
      .notEmpty()
      .withMessage("Debes ingresar un email")
      .bail()
      .isEmail()
      .withMessage("El dato ingresado no corresponde a un email"),

    check("password")
    .notEmpty()
    .withMessage("Debes ingresar una contraseña")
    .bail()
    .isLength({ min: 8})
    .withMessage('La contraseña debe tener al menos 8 caracteres'),

    check('avatar').custom((value, { req }) => {
      if (!req.file) return true; // Subir la imagen es opcional
      
      const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const fileExtension = require('path').extname(req.file.originalname).toLowerCase();
    
    
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(`Los formatos permitidos son ${acceptedExtensions.join(', ')}`);
      }
    
      return true;
    }),
  
]

const productAddValidator = [
  check('title')
  .notEmpty()
  .withMessage('Debes de ingresar un título')
  .bail()
  .isLength({ min: 5}, { max: 45 })
  .withMessage('El título debe de tener de 5 a 45 caracteres')
  ,
  check('subtitle')
  .notEmpty()
  .withMessage('Debes de ingresar un subtítulo')
  .bail()
  .isLength({ min: 5}, { max: 55 })
  .withMessage('El subtítulo debe de tener de 5 a 55 caracteres')
  ,
  check('description')
  .notEmpty()
  .withMessage('Debes de ingresar una descripción')
  .bail()
  .isLength( { min: 20}, { max: 280 })
  .withMessage('La descripción debe tener entre 20 y 280 caracteres')
  ,
  check('language')
  .notEmpty()
  .withMessage('Debes seleccionar un idioma')
  .bail()
  .isInt()
  .withMessage('El idioma seleccionado no es válido'),

  check('category')
  .notEmpty()
  .withMessage('Debes seleccionar una categoría')
  .bail()
  .isInt()
  .withMessage('La categoría seleccionada no es válida'),


  check('image').custom((value, { req }) => {
  
    if (!req.file) return true; // Subir la imagen es opcional
  
    const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = require('path').extname(req.file.originalname).toLowerCase();

    if (!acceptedExtensions.includes(fileExtension)) {
      throw new Error(`Los formatos permitidos son ${acceptedExtensions.join(', ')}`);
    }
  
    return true;
  }),

  check('price')
  .isFloat({ min: 0 })
  .withMessage('Debes ingresar un número válido')
  .bail()
  .isFloat({ max: 9999 })
  .withMessage('El precio no debe de excederse de los 5 digitos'),
 ]

 const productEditValidator = [
  check('title')
  .notEmpty()
  .withMessage('Debes de ingresar un título')
  .bail()
  .isLength({ min: 5}, { max: 45 })
  .withMessage('El título debe de tener de 5 a 45 caracteres')
  ,
  check('subtitle')
  .notEmpty()
  .withMessage('Debes de ingresar un subtítulo')
  .bail()
  .isLength({ min: 5}, { max: 55 })
  .withMessage('El subtítulo debe de tener de 5 a 55 caracteres')
  ,
  check('description')
  .notEmpty()
  .withMessage('Debes de ingresar una descripción')
  .bail()
  .isLength( { min: 20}, { max: 280 })
  .withMessage('La descripción debe tener entre 20 y 280 caracteres')
  ,
  check('language')
  .notEmpty()
  .withMessage('Debes seleccionar un idioma')
  .bail()
  .isInt()
  .withMessage('El idioma seleccionado no es válido'),

  check('category')
  .notEmpty()
  .withMessage('Debes seleccionar una categoría')
  .bail()
  .isInt()
  .withMessage('La categoría seleccionada no es válida'),


  check('image').custom((value, { req }) => {
  
    if (!req.file) return true; // Subir la imagen es opcional
  
    const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = require('path').extname(req.file.originalname).toLowerCase();

    if (!acceptedExtensions.includes(fileExtension)) {
      throw new Error(`Los formatos permitidos son ${acceptedExtensions.join(', ')}`);
    }
  
    return true;
  }),

  check('price')
  .isFloat({ min: 0 })
  .withMessage('Debes ingresar un número válido')
  .bail()
  .isFloat({ max: 9999 })
  .withMessage('El precio no debe de excederse de los 5 digitos'),
 ]
module.exports = { loginValidator, registerValidator, productAddValidator, productEditValidator }; 