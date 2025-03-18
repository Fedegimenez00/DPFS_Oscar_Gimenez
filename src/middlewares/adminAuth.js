function adminAuth(req, res, next) {

// Esta autenticación de momento sólo sirve correctamente para Guests

if (!req.session?.userLogged ) {
    return res.redirect('/')

} else if(!req.session?.userLogged.role == 'admin'){
    return res.redirect('/profile')
}
next()
}

module.exports = adminAuth