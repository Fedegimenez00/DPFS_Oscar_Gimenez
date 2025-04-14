const bcryptjs = require('bcryptjs')
const path = require('path');
const fs = require('fs');



const userController = {
    login : (req, res) => {
     res.render('users/login'); 
     let resultado = bcryptjs.compareSync('', 'hash');
    },
    register : (req, res) =>{
      res.render('users/register');
      },
    processRegister: (req, res) => {
      let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')), "utf-8");
      const { username, email, password } = req.body;

      let newUser = {
        user_id: users.length + 1,
        username,
        email,
        password: bcryptjs.hashSync(password, 10),
        avatar: req.file?.filename || "default.png",
        user_firstname: "",
        user_surname: "",
        user_headline: "",
        user_description: "",
        role: "user"
      };
      users.push(newUser);

      fs.writeFileSync((path.resolve(__dirname, '../database/users.json')), JSON.stringify(users, null, '  '));
      res.redirect('/');
    },

    processLogin: (req, res) => {
      //Verificar que el user exista
      let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
      
      let userToLogin = users.find(user => user.username == req.body.username);
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
        res.cookie('username', userToLogin.username, 
        {maxAge: 60 * 1000 * 60}); //La cookie expira en 1 hora
       }
       //Redireccione a la vista de perfil
       if (userToLogin.role == 'user') {
        return res.redirect('/profile/' + userToLogin.user_id)
       } else if (userToLogin.role == 'admin'){
        return res.redirect('/admin')
       }
       
      

      }
      //Redirección en el caso que la contra es incorrecta
      return res.redirect('/login')
      } else {
        //Si el usuario no lo encuentra        
        return res.redirect('/login')
      }
      
      
    },

    profile: (req, res) => {
      const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
      const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/products.json')));
      
      const userToLogin = req.session.userLogged;




      // Se busca el usuario del perfil según el ID
      const myUser = users.find(user => user.user_id === parseInt(req.params.user_id, 10));
    
      // Si no existe el usuario, devuelve un error
      if (!myUser) {
        return res.status(404).send('Usuario no encontrado');
      }
    
      // Se muestran los productos creados por el usuario
      const userProducts = products.filter(product => product.author === myUser.username);
    
      return res.render(path.resolve(__dirname, '../views/users/profile'), {
        products: userProducts,
        myUser,
        userToLogin
      });
    },
    

  
      // Filtrar solo los productos cuyo autor coincide con el usuario logueado
      
      //let users = JSON.parse(fs.readFileSync((path.resolve(__dirname, '../database/users.json')), "utf-8"));
      //let myUser = users.find(user => user.user_id === parseInt(req.params.user_id, 10));

      
    
    

    logout: (req, res)  => {
      res.clearCookie('username');
      req.session.destroy();
      res.redirect('/');
    },

    edit: (req, res) => {
     const { user_id } = req.params
     let users = JSON.parse(fs.readFileSync((path.resolve(__dirname, '../database/users.json')), "utf-8"));
     let userFound = users.find((user) => user.user_id == user_id);

     if (userFound) {
      res.render('users/profileEdit', {user: userFound});
     } else {
      res.render("not-found.ejs", { title: "Usuario no encontrado" });
     }

     

     /* let userFound = User.findById(req.params.user_id);
      if (userFound) {
        return res.render("users/edit", { user: userFound });
      }
      return res
        .status(404)
        .render("not-found.ejs", { title: "Usuario no encontrado" });
        */
      },

      editUpdate: (req, res) => {
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json'), 'utf-8'));
      
        const { user_id } = req.params;
        const { user_firstname, user_surname, user_headline, user_description } = req.body;
      
        let userFound = users.find(user => user.user_id === parseInt(user_id));
      
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
        let updateUser = {
          ...userFound,
          user_firstname,
          user_surname,
          user_headline,
          user_description,
          avatar: newAvatar
        };
      
        let updatedUsers = users.map(user =>
          user.user_id === parseInt(user_id) ? updateUser : user
        );
      
        fs.writeFileSync(
          path.resolve(__dirname, '../database/users.json'),
          JSON.stringify(updatedUsers, null, 2),
          'utf-8'
        );
      
        req.session.userLogged = updateUser;
      
        if (updateUser.role === 'admin') {
          return res.redirect('/admin');
        } else {
          return res.redirect('/profile/' + updateUser.user_id + '/edit');
        }
      },
      

    securityEdit: (req, res) => {
      const { user_id } = req.params
      let users = JSON.parse(fs.readFileSync((path.resolve(__dirname, '../database/users.json')), "utf-8"));
      let userFound = users.find(user => user.user_id == user_id);
 
      if (userFound) {
       res.render('users/profileEditSecurity', {user: userFound});
      } else {
       res.render("not-found.ejs", { title: "Usuario no encontrado" });
      }
     },

     securityEditUpdate: (req, res) => {
      let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json'), 'utf-8'));
      let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/products.json'), 'utf-8'));
    
      const { user_id } = req.params;
      const { username, email, password } = req.body;
    
      let userFound = users.find(user => user.user_id === parseInt(user_id));
      if (!userFound) return res.status(404).send("Usuario no encontrado");
    
      const oldUsername = userFound.username; // Guardamos el anterior
    
      // Actualización segura
      if (password && password.trim() !== '') {
        userFound.password = bcryptjs.hashSync(password, 10);
      }
      if (username && username.trim() !== '') {
        userFound.username = username;
      }
      if (email && email.trim() !== '') {
        userFound.email = email;
      }
    
      // Actualizar productos asociados si cambió el nombre de usuario
      if (username && username.trim() !== '' && username !== oldUsername) {
        products = products.map(product => {
          if (product.author === oldUsername) {
            return { ...product, author: username };
          }
          return product;
        });
    
        fs.writeFileSync(
          path.resolve(__dirname, '../database/products.json'),
          JSON.stringify(products, null, 2),
          'utf-8'
        );
      }
    
      let updatedUsers = users.map(user =>
        user.user_id === parseInt(user_id) ? userFound : user
      );
    
      fs.writeFileSync(
        path.resolve(__dirname, '../database/users.json'),
        JSON.stringify(updatedUsers, null, 2),
        'utf-8'
      );
    
      req.session.userLogged = userFound;
    
      if (userFound.role === 'admin') {
        return res.redirect('/admin');
      } else {
        return res.redirect('/profile/' + userFound.user_id + '/edit-security');
      }
    },
    
    destroy: (req, res) => {
      const { user_id } = req.params
      let users = JSON.parse(fs.readFileSync((path.resolve(__dirname, '../database/users.json')), "utf-8"));
      let userFound = users.find((user) => user.user_id == user_id);
 
      if (userFound) {
       res.render('users/userDeleteAccount', {user: userFound});
      } else {
       res.render("not-found.ejs", { title: "Usuario no encontrado" });
      }
 
    },
    processDestroy: (req, res) => {
      let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json'), "utf-8"));
    
      // Convertir user_id a número por si en JSON es un número
      const userId = parseInt(req.params.user_id);
    
      // Buscar al usuario por user_id
      let userToDelete = users.find(user => user.user_id === userId);
    
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


      // Filtrar el usuario
      users = users.filter(user => user.user_id !== userId);
    
      // Sobrescribir JSON
      fs.writeFileSync(
        path.resolve(__dirname, '../database/users.json'),
        JSON.stringify(users, null, 2),
        'utf-8'
      );
    
      // Limpiar sesión y cookies
      req.session.destroy(() => {
        res.clearCookie('username');
        res.redirect('/');
      });
    },
    

    courseList: (req, res) => {
     
      res.render('users/userMyCourses')
    },

    courseCreate: (req, res) => {
      let user = req.session.userLogged;
      let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/products.json')));
  
      // Filtrar solo los productos cuyo autor coincide con el usuario logueado
      let userProducts = products.filter(product => product.author === user.username);
  
      res.render(path.resolve(__dirname, '../views/users/userAddCourses'), { products: userProducts });
    },

    


}

module.exports = userController;