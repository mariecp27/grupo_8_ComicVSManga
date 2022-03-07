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
app.get('/iniciar-sesion', userRoutes);
app.get('/registro', userRoutes);

const productsRoutes = require('./routes/productsRouter');
app.get('/carrito', productsRoutes);
app.get('/vota-a-Loki', productsRoutes);
app.get('/noche-mas-oscura', productsRoutes);
app.get('/shingeki-no-kyojin', productsRoutes);
app.get('/scott-pilgrim', productsRoutes);


//Servidor
app.listen(3030, () => {
    console.log("Servidor corriendo en el puerto 3030, ¡vamos al Manga!");
});
