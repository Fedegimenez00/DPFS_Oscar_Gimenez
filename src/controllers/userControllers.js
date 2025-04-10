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
        return res.redirect('/profile')
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
      let user = req.session.userLogged;
      
      let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/products.json')));
      let userProducts = products.filter(product => product.author === user.username);

      
    return res.render(path.resolve(__dirname, '../views/users/profile'), { products: userProducts }/*, {myUser},*/);
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
     }

     res.render("not-found.ejs", { title: "Usuario no encontrado" });

     /* let userFound = User.findById(req.params.user_id);
      if (userFound) {
        return res.render("users/edit", { user: userFound });
      }
      return res
        .status(404)
        .render("not-found.ejs", { title: "Usuario no encontrado" });
        */
      },

    securityEdit: (req, res) => {
     
      res.render('users/profileEditSecurity')
    },

     securityEdit: (req, res) => {
     
      res.render('users/profileEditSecurity')
    },
    destroy: (req, res) => {

      res.render("users/userDeleteAccount");
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

    processUpdate: (req, res) => {
      let users = JSON.parse(fs.readFileSync((path.resolve(__dirname, '../database/users.json')), "utf-8"));
      const { username, email, password } = req.body;
      let userFound = User.findById(req.params.user_id);
  
      userFound.username = username;
      userFound.email = email;
      userFound.password =
        password == "" ? userFound.password : bcryptjs.hashSync(password, 10);
      userFound.avatar = req.file?.filename || userFound.avatar;
  
      fs.writeFileSync((path.resolve(__dirname, '../database/users.json')), JSON.stringify(users, null, "  "));
      req.session.userLogged = userFound;
      res.redirect("/");
    },


}

module.exports = userController;