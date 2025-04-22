const express = require('express');

// 1:00:00   C31 login-register.mkv

const path = require('path');
const PORT = 3000;
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userLogged = require('./middlewares/userLogged');
const db = require('./database/models');

//temporal
const sqlite3 = require('sqlite3').verbose();
const dataBase = new sqlite3.Database(path.resolve(__dirname, '../databaseSQLite/zerotrust_db.sqlite'));

const methodOverride = require('method-override');

const indexRouter = require("./routes/index.routes.js");
const userRouter = require ('./routes/user.routes.js');
const productRouter = require ('./routes/product.routes.js');
const adminRouter = require ('./routes/admin.routes.js')

/* Sirve para ver logs de las peticiones
const morgan = require('morgan');
app.use(morgan('tiny'))
*/

//Configuración de motores estáticos
app.use(express.static(path.join(__dirname, '..', 'public')))

// Session
app.use(session({secret: 'ThisIsZeroTrust',
    saveUninitialized: true, resave: true}))

// Sesión global a todas las vistas
app.use((req, res, next) => {
    res.locals.user = req.session.userLogged || null;
    res.locals.isLogged = !!req.session.userLogged;
    next();
  });

// Cookies
app.use(cookieParser());

//Configuración del motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({extended : false}));


//Middleware de aplicación el cual se encargue de controlar la posibilidad de usar otros métodos diferentes al GET y al POST, en nuestros formularios
app.use(methodOverride('_method'));

// UserLogged
app.use(userLogged);

//Rutas de navegación
app
.use('/', indexRouter)

.use('/', productRouter)

.use('/', userRouter)

.use ('/', adminRouter)

.use(function(req,res) {
    res.status(404).render('not-found.ejs', {title: 'No encontrado'});
})

app.listen(PORT, async () => {
  // db.sequelize.sync({ alter: true }) // o { alter: true } si no querés borrar nada
/* await db.sequelize.sync({ force: true}); //(Permanece comentado hasta que nos haga falta)
    console.log('All models were synchronized succesfully');
*/
/*.then(() => {
    console.log('All models were synchronized successfully');
  })
  .catch(err => {
    console.error('Error synchronizing models:', err);
  });
*/
    console.log("Server is running in: " + "http://localhost:" + PORT);
});