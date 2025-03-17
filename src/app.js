const express = require('express');

const path = require('path');
const PORT = 3000;
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

const methodOverride = require('method-override');

const userLogged = require('./middlewares/userLogged')
const indexRouter = require("./routes/index.routes.js");
const userRouter = require ('./routes/user.routes.js');
const productRouter = require ('./routes/product.routes.js');
const adminRouter = require ('./routes/admin.routes.js')


//Configuración de motores estáticos
app.use(express.static(path.join(__dirname, '..', 'public')))

// Session
app.use(session({secret: 'ThisIsZeroTrust',
    saveUninitialized: true, resave: true}))

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


app.listen(PORT, () =>
console.log("Server is running in: " + "http://localhost:" + PORT));