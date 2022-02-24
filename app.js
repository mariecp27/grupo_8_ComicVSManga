const express = require('express');
const path = require('path');
const app = express();

const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));

app.listen(3030, () => {console.log("Servidor corriendo en el puerto 3030, ¡vamos al Manga!")});

app.get('/', (req,res) => {res.sendFile(path.join(__dirname, '/views/index.html'))});

app.get('/iniciar-sesion', (req,res) => {res.sendFile(path.join(__dirname, '/views/login.html'))});

app.get('/registro', (req,res) => {res.sendFile(path.join(__dirname, '/views/register.html'))});

app.get('/carrito', (req,res) => {res.sendFile(path.join(__dirname, '/views/productCart.html'))});

app.get('/vota-a-Loki', (req,res) => {res.sendFile(path.join(__dirname, '/views/productDetails-votaALoki.html'))});

app.get('/noche-mas-oscura', (req,res) => {res.sendFile(path.join(__dirname, '/views/productDetails-nocheMasOscura.html'))});

app.get('/shingeki-no-kyojin', (req,res) => {res.sendFile(path.join(__dirname, '/views/productDetails-shingeki-no-kyojin.html'))});

app.get('/scott-pilgrim', (req,res) => {res.sendFile(path.join(__dirname, '/views/productDetails-scott-pilgrim.html'))});
