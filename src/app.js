const express = require('express');

const path = require('path');
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public/')))

app.get('/', (req,res) => {
    return res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.listen(PORT, () =>
console.log("Server is running in: " + "http://localhost:" + PORT));