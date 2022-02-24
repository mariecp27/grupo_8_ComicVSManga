const express = require('express');
const path = require('path');
const app = express();

const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));

app.listen(3030, () => {console.log("Servidor corriendo en el puerto 3030, ¡vamos al Manga!")});

app.get('/', (req,res) => {res.sendFile(path.join(__dirname, '/views/index.html'))});

app.get('/iniciar-sesion', (req,res) => {res.sendFile(path.join(__dirname, '/views/login.html'))});

app.get('/producto-vota-a-Loki', (req,res) => {res.sendFile(path.join(__dirname, '/views/productDetails-votaALoki.html'))});

app.get('/producto-noche-mas-oscura', (req,res) => {res.sendFile(path.join(__dirname, '/views/productDetails-nocheMasOscura.html'))});
<<<<<<< HEAD

app.get('/producto-scott-pilgrim', (req,res) => {res.sendFile(path.join(__dirname, '/views/productDetails-scott-pilgrim.html'))});

app.get('/producto-shingeky-no-kyojin', (req,res) => {res.sendFile(path.join(__dirname, '/views/productDetails-shingeky-no-kyojin.html'))});

app.get('/carrito', (req,res) => {res.sendFile(path.join(__dirname, '/views/productCart.html'))});

app.get('/registro', (req,res) => {res.sendFile(path.join(__dirname, '/views/register.html'))});

=======

app.get('/carrito', (req,res) => {res.sendFile(path.join(__dirname, '/views/productCart.html'))});

app.get('/registro', (req,res) => {res.sendFile(path.join(__dirname, '/views/register.html'))});
>>>>>>> 84cad9c20c86520bb9e1129b0c9d75db8d094a1b
