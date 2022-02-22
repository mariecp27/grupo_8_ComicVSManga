const express = require('express');
const path = require('path');
const app = express();

const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));

app.listen(3030, () => {console.log("Servidor corriendo en el puerto 3030, ¡vamos al Manga!")});

app.get('/', (req,res) => {res.sendFile(path.join(__dirname, '/views/index.html'))});

app.get('/iniciar-sesion', (req,res) => {res.sendFile(path.join(__dirname, '/views/login.html'))});

app.get('/producto-vota-a-Loki', (req,res) => {res.sendFile(path.join(__dirname, '/views/productDetails-votaALoki.html'))});

app.get('/carrito', (req,res) => {res.sendFile(path.join(__dirname, '/views/productCart.html'))});

app.get('/registro', (req,res) => {res.sendFile(path.join(__dirname, '/views/register.html'))});
