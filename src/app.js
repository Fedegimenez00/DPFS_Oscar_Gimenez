const express = require('express');

const path = require('path');
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req,res) => {
    return res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/product-detail', (req,res) => {
    return res.sendFile(path.join(__dirname, 'views', 'productDetail.html'))
})

app.get('/cart', (req,res) => {
    return res.sendFile(path.join(__dirname, 'views', 'productCart.html'))
})

app.get('/register', (req,res) => {
    return res.sendFile(path.join(__dirname, 'views', 'register.html'))
})

app.get('/login', (req,res) => {
    return res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

app.listen(PORT, () =>
console.log("Server is running in: " + "http://localhost:" + PORT));