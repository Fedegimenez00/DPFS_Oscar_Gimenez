const bcryptjs = require('bcryptjs')
const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const User = require('../services/User');


const db =  require('../database/models')

const userController = {
    login : (req, res) => {
     res.render('users/login'); 
     let resultado = bcryptjs.compareSync('', 'hash');
    },
    register : (req, res) =>{
      res.render('users/register');
      },
    processRegister: async (req, res) => {
      try {

        const resultValidation = validationResult(req);
        const { name, email, password } = req.body;

        if (resultValidation.isEmpty()) {
        let newUser = {
          name,
          email,
          password: bcryptjs.hashSync(password, 10),
          avatar: req.file?.filename || "default.png",
          description: "",
          firstName: "",
          lastName: "",
          headline: "",
          role: 0
        };
      

        await db.User.create(newUser)
          res.redirect('/');
        } else {
          return res.render("users/register", {
            errors: resultValidation.mapped(),
            old: req.body,
          });
        }
        
      } catch (error) {
        console.log(error);
      }
      
     
    },

    processLogin: async (req, res) => {
      //Verificar que el user exista 
      try {
    
      const resultValidation = validationResult(req);
     
     if (resultValidation.isEmpty()){ 
     
      let userToLogin = await db.User.findOne({
        where: 
        {
          name: req.body.name,
        }
      });

      if (userToLogin) {
        //Comparar contraseñas
        let passOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
      if (passOk) {
       //Borrar password previo a la creación de la sesión
       delete userToLogin.password;     

       //Generar una sesión
       req.session.userLogged = userToLogin;

       //Recordar usuario
       if (req.body.rememberme == 'on') {
        res.cookie('name', userToLogin.name, 
        {maxAge: 60 * 1000 * 60,
        }); //La cookie expira en 1 hora
       }
      
       //Redireccione a la vista de perfil
       if (userToLogin.role == 0) {
        return res.redirect('/profile/' + userToLogin.id)
       } else if (userToLogin.role == 1){
        return res.redirect('/admin')
       }
      }

       return res.render("users/login", {
        //Si el error viene de la contraseña
        errors: {
          password: {
            msg: "Credenciales inválidas",
          },
        },
        old: req.body,
      });
    } else {
      // Si el username no lo encuentra
      return res.render("users/login", {
        errors: {
          name: {
            msg: "Usuario no existente",
          },
          old: req.body,
        },
      });
    }
  } else {
        
    //Si hay errores, se vuelve al formulario con los mensajes
    return res.render("users/login", {
      errors: resultValidation.mapped(),
      old: req.body,
    });
  }
} catch (error) {
      console.log(error);
        
}
},

    profile: async (req, res) => {
  
      try {
      const users = await db.User.findAll()

      // Se busca el usuario del perfil según el ID
      let myUser = await db.User.findByPk(req.params.id) //Cerca de que funcione
      const userToLogin = req.session.userLogged;

      
      // Se muestran los productos creados por el usuario
      const userProducts = await db.Product.findAll({
        where: {
          user_id: myUser.id
        },
        include: ["categories", "subcategories", "languages", 'users']
      });

      // Si no existe el usuario, devuelve un error
       if (!myUser) {
        return res.status(404).send('Usuario no encontrado');
      }
    
    
      return res.render(path.resolve(__dirname, '../views/users/profile'), {
       products: userProducts,
       myUser,
      user: req.session.userLogged,
        userToLogin,
        users
      });

    } catch (error) {
      console.log(error);
    }
    
    },
    
    

    logout: (req, res)  => {
      res.clearCookie('username');
      req.session.destroy();
      res.redirect('/');
    },

    edit: async (req, res) => {
      let userFound = await db.User.findByPk(req.params.id)

     if (userFound) {
      res.render('users/profileEdit', {user: userFound});
     } else {
      res.render("not-found.ejs", { title: "Usuario no encontrado" });
     }

     
      },

      editUpdate: async (req, res) => {
      
       const { id } = req.params;
        const { firstName, lastName, headline, description } = req.body;
        let userFound = await db.User.findByPk(req.params.id)

        if (!userFound) {
          return res.status(404).send("Usuario no encontrado");
        }

         // Comprueba si hay una nueva imagen
        let oldAvatar = userFound.avatar;
        let newAvatar = req.file ? req.file.filename : oldAvatar;

        // Si se subió una nueva imagen y la vieja no es la default, se elimina
      if (req.file && oldAvatar !== 'default.png') {
      const imagePath = path.join(__dirname, '../../public/database/images/users', oldAvatar);
      if (fs.existsSync(imagePath)) {

        fs.unlinkSync(imagePath);
      }
     }

       //Actualiza el usuario en la base de datos
      await db.User.update({
        //Aquí van los datos nuevos
          firstName,
          lastName,
          headline,
          description,
          avatar: newAvatar
      }, {
        //Aquí va la condición
        where: { id }
      })
        
      
      
   // Refrescar sesión si es el usuario logueado
    let updateUser;
   if (req.session.userLogged && req.session.userLogged.id == id) {
    updateUser = await db.User.findByPk(id);
    req.session.userLogged = updateUser;
    }

    req.session.userLogged = updateUser;

    if (updateUser.role === '1') {
          return res.redirect('/admin');
        } else {
          return res.redirect('/profile/' + updateUser.id + '/edit');
        }
      },    
      
        
    securityEdit: async (req, res) => {
      const { id } = req.params;
      let userFound = await db.User.findByPk( id )
   
      if (userFound) {
       res.render('users/profileEditSecurity', {user: userFound});
      } else {
       res.render("not-found.ejs", { title: "Usuario no encontrado" });
      }
     },

     securityEditUpdate: async (req, res) => {
     
      const { id } = req.params;
      const { name, email, password } = req.body;
      let userFound = await db.User.findByPk( id )

      if (!userFound) return res.status(404).send("Usuario no encontrado");

      const oldName = userFound.name; // Se guarda el anterior

      // Actualización segura
    
      if (password && password.trim() !== '') {
        userFound.password = bcryptjs.hashSync(password, 10);
      }
      if (name && name.trim() !== '' && name !== oldName) {
        userFound.name = name;
      }
      if (email && email.trim() !== '') {
        userFound.email = email;
      }
      
    // Ejecutamos el update con Sequelize
   await db.User.update(
  {
    name,
    email,
    name,
    password: bcryptjs.hashSync(password, 10)
  },
  {
    where: { id }
  }
);

// Si corresponde, actualizar sesión
if (req.session.userLogged && req.session.userLogged.id == id) {
  const updatedUser = await db.User.findByPk(id);
  req.session.userLogged = updatedUser;
}
    
      req.session.userLogged = userFound;
    
      if (userFound.role == 1) {
        return res.redirect('/admin');
      } else {
        return res.redirect('/profile/' + userFound.id + '/edit-security');
      }
    },
    
    destroy: async (req, res) => {
      const { id } = req.params;
      let userFound = await db.User.findByPk( id )

      if (userFound) {
       res.render('users/userDeleteAccount', {user: userFound});
      } else {
       res.render("not-found.ejs", { title: "Usuario no encontrado" });
      }
 
    },
    processDestroy: async (req, res) => {
      const { id } = req.params;

      // Busca al usuario por id
      let userToDelete = await db.User.findByPk(id); 
    
    
      
      if (!userToDelete) {
        return res.status(404).send("Usuario no encontrado");
      }
    
      // Eliminar imagen si no es la default
      if (userToDelete.avatar !== 'default.png') {
        const avatarPath = path.join(__dirname, '../../public/database/images/users', userToDelete.avatar);
        if (fs.existsSync(avatarPath)) {
          fs.unlinkSync(avatarPath);
        }
      }

      await db.User.destroy({
        where: {
          id: req.params.id,
        },
      });

      
 
      // Limpiar sesión y cookies
      req.session.destroy(() => {
        res.clearCookie('name');
        res.redirect('/');
      });
    },
    

    courseList: (req, res) => {
     
      res.render('users/userMyCourses')
    },

    courseCreate: async (req, res) => {
      let user = req.session.userLogged;

      // Filtra solo los productos cuyo autor coincide con el id del usuario logueado
      const userProducts = await db.Product.findAll({
        where: {
          user_id: user.id
        },
        include: ["categories", "subcategories", "languages", 'users']
      });
      
      res.render(path.resolve(__dirname, '../views/users/userAddCourses'), {  userProducts });

    },

    


}

module.exports = userController;