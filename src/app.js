// Módulos
const express = require('express');
const app = express();
const path = require('path');

// Configuración
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//Rutas
const mainRoutes = require('./routes/mainRouter');
app.use('/', mainRoutes);

const userRoutes = require('./routes/usersRouter');
app.use('/usuarios', userRoutes);

const productsRoutes = require('./routes/productsRouter');
app.use('/productos', productsRoutes);


//Servidor
app.listen(3030, () => {
    console.log("Servidor corriendo en el puerto 3030, ¡vamos al Manga!");
});