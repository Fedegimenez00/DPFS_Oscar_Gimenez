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
      let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
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
       req.session.userLogged = userToLogin

       //Recordar usuario
       if (req.body.rememberme == 'on') {
        res.cookie('username', userToLogin.username, 
        {maxAge: 60 * 1000 * 60}); //La cookie expira en 1 hora
       }
       //Redireccione a la vista de perfil
       if (userToLogin.role == 'user') {
         res.redirect('/profile')
       } else if (userToLogin.role == 'admin'){
        res.redirect('/admin')
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

      res.render("users/profile", { user: req.session.userLogged });
    },

    logout: (req, res)  => {
      res.clearCookie('username');
      req.session.destroy();
      res.redirect('/');
    },

    edit: (req, res) => {
     
      res.render('users/profileEdit')
     /* let userFound = User.findById(req.params.user_id);
      if (userFound) {
        return res.render("users/edit", { user: userFound });
      }
      return res
        .status(404)
        .render("not-found.ejs", { title: "Usuario encontrado" });
        */
      },

    securityEdit: (req, res) => {
     
      res.render('users/profileEditSecurity')
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