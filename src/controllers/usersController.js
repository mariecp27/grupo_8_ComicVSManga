const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');

let usersController = {
    // Formulario de registro de usuarios
    register: (req, res) =>{
        return res.render('users/register');
    },

    // Almacenamiento de los usuarios registrados
    store: (req, res) => {
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        //Verificación de errores
        const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('users/register', {
				errors:resultValidation.mapped(),
				oldData: req.body
			});
		}

		//Verificar que el nombre de usuario o email no sea usado por otro usuario
        let nameInDB = users.find(user => user.user === req.body.user);

		if(nameInDB){
			return res.render('users/register', {
				errors: {
					user:{
						msg: 'Este nombre de usuario ya está en uso',
					}
				},
				oldData: req.body,
			});
		}

		let emailInDB = users.find(user => user.email === req.body.email);

		if(emailInDB){
			return res.render('users/register', {
				errors: {
					email:{
						msg: 'Este email ya está en uso',
					}
				},
				oldData: req.body,
			});
		}

        //Creación del nuevo usuario
        let nextId = users[users.length - 1].id + 1;

		let filename = '';

        if(req.file){
            filename = req.file.filename;
        } else{
            filename = 'default.png'
        }
        
		newUser = {
            id: nextId,
			user: req.body.user,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password1, 10),
			image: filename,
            userType: 'user',
		}

		users.push(newUser);

		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

		return res.redirect('/users/login')
    },

    login: (req, res) =>{
        return res.render('users/login',{
            title: 'Inicio de Sesión',
        });
    }
};

module.exports = usersController;