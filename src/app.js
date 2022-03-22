// Módulos
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override');

// Ejecución
const app = express();

// Configuración
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
const mainRoutes = require('./routes/mainRouter');
app.use('/', mainRoutes);

const userRoutes = require('./routes/usersRouter');
app.use('/users', userRoutes);

const productsRoutes = require('./routes/productsRouter');
app.use('/products', productsRoutes);


// Servidor
app.listen(3030, () => {
    console.log("Servidor corriendo en el puerto 3030, ¡vamos al Manga!");
});
