const express = require('express');

const path = require('path');
const PORT = 3000;
const app = express();

const indexRouter = require("./routes/index.routes.js");
const userRouter = require ('./routes/user.routes.js');
const productRouter = require ('./routes/product.routes.js');


//Configuración de motores estáticos
app.use(express.static(path.join(__dirname, '..', 'public')))

//Configuración del motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//Rutas de navegación
app
.use('/', indexRouter)

.use('/', productRouter)

.use('/', userRouter)


app.listen(PORT, () =>
console.log("Server is running in: " + "http://localhost:" + PORT));