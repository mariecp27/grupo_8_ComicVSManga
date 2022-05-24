// Módulos
require('dotenv').config();

const express = require('express');
const path = require('path');
const methodOverride =  require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const userLogged = require('./middlewares/userLoggedMiddleware');
const productCartMiddleware = require('./middlewares/productsInCartMiddleware');

// Ejecución
const app = express();

// Configuración
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
	secret: "Secret word",
	resave: false,
	saveUninitialized: false,
}));
app.use(cookies());
app.use(userLogged);
app.use(productCartMiddleware);

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
app.listen(process.env.PORT || 3030, () => {
    console.log("Servidor corriendo en el puerto 3030, ¡vamos al Manga!");
});
