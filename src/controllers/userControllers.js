const userController = {
    login : (req, res) => {
        return res.render('users/login');
    },
    register : (req, res) =>{
        return res.render('users/register');
    },
    admin : (req, res) =>{
        return res.render('users/adminInterface');
    }
};

module.exports = userController;