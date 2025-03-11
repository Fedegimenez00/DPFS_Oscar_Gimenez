const userController = {
    login : (req, res) => {
        return res.render('users/login');
    },
    register : (req, res) =>{
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
  
          return res.render('/register');
      },
  
  //Parsea el Json, extrae el último objeto, recibe el nuevo producto generado por el formulario de
  // create, pushea el nuevo producto y convierte el nuevo archivo en un JSON
      save : (req, res) =>{
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        let lastUser = users.pop();
        users.push(lastUser);
        let newUser = {
          user_id: lastUser.user_id +1,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          type: user,
          //avatar: req.file.filename,
        }

       users.push(newUser);
       let newUserSave = JSON.stringify(users, null, 2);
       fs.writeFileSync(path.resolve(__dirname, '../database/users.json'), newUserSave);
       //redirecciona a una ruta deseada
       res.redirect('/');
        },
}

module.exports = userController;