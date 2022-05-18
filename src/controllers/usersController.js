const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const Op = db.Sequelize.Op;

let usersController = {
    // Formulario de registro de usuarios
    register: (req, res) =>{
		return res.render('users/register');
    },

    // Almacenamiento de los usuarios registrados
    store: async(req, res) => {

        // Verificación de errores
        const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('users/register', {
				errors:resultValidation.mapped(),
				oldData: req.body
			});
		}

		// Verificar que el nombre de usuario no sea usado por otro usuario
		let nameInDB = await db.User.findAll({
            where:{
                user: req.body.user,
            }
        }).catch(function(errors){
            console.log(errors);
        });

		if(nameInDB.length > 0){
			return res.render('users/register', {
				errors: {
					user:{
						msg: 'Este nombre de usuario ya está en uso',
					}
				},
				oldData: req.body,
			});
		}

		// Verificar que el email no sea usado por otro usuario
		let emailInDB = await db.User.findAll({
            where:{
                email: req.body.email,
            }
        }).catch(function(errors){
            console.log(errors);
        });

		if(emailInDB.length > 0){
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
		if(req.file){
            let filename = req.file.filename;

            let newUser = await db.User.create({
                user: req.body.user,
				name: req.body.name,
				last_name: req.body.lastName,
				email: req.body.email,
				password: bcryptjs.hashSync(req.body.password1, 10),
				image: filename,
				user_type_id: 1,
            }).catch(function(errors){
                console.log(errors);
            });
        }else{
            let newUser = await db.User.create({
                user: req.body.user,
				name: req.body.name,
				last_name: req.body.lastName,
				email: req.body.email,
				password: bcryptjs.hashSync(req.body.password1, 10),
				image: 'default.png',
				user_type_id: 1,
            }).catch(function(errors){
                console.log(errors);
            });
        }

		return res.redirect('/users/login');
    },

	// Formulario de inicio de sesión
    login: (req, res) =>{
		return res.render('users/login');
    },

	// Procesar inicio de sesión
	access: async(req, res) => {
		
        // Verificación de errores
        const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('users/login', {
				errors:resultValidation.mapped(),
				oldData: req.body
			});
		}

		// Búsqueda del email
		let userToLogin = await db.User.findOne({
            where:{
                email: req.body.email,
            }
        }).catch(function(errors){
            console.log(errors);
        });

		if(userToLogin){
			let passwordProvided = bcryptjs.compareSync(req.body.password, userToLogin.password);

			if(passwordProvided){
				delete userToLogin.password;

				req.session.userLogged = userToLogin;

				if(req.body.rememberMe) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 3600 })
				}

				return res.redirect('/users/profile');
			}

			return res.render('users/login', {
				errors: {
					email: {
						msg: 'Verifica los datos ingresados',
					},
					password: {
						msg: 'Verifica los datos ingresados',
					}
				},
				oldData: req.body,
			});
		}

		return res.render('users/login', {
			errors: {
				email: {
					msg: 'Este correo no se encuentra en nuestra base de datos',
				}
			},
			oldData: req.body,
		});
	},

	// Perfil del usuario
	profile: (req, res) => {
		res.render('users/userProfile',{
			user: req.session.userLogged,
		});
	},

	// Edición del perfil
	profileEdition: async(req, res) => {

		// Búsqueda del usuario
		let loggedUser = await db.User.findByPk(req.session.userLogged.user_id)
			.catch(function(errors){
            console.log(errors);
        	});

		res.render('users/userProfileEdition',{
			user: loggedUser,
		});
	},

	// Actualizar datos personales
	profileUpdate: async(req, res) => {

		// Búsqueda del usuario
		let loggedUser = await db.User.findByPk(req.session.userLogged.user_id)
			.catch(function(errors){
            console.log(errors);
        	});

		let userId = loggedUser.user_id;

		// Verificación de errores
		const resultValidation = validationResult(req);
				
		if (resultValidation.errors.length > 0) {
			return res.render('users/userProfileEdition', {
				errors:resultValidation.mapped(),
				oldData: req.body,
				user: loggedUser
			});
		}

		// Verificar que el nombre de usuario no sea usado por otro usuario
		let nameInDB = await db.User.findAll({
            where:{
                user: req.body.user,
				user_id: { [ Op.not ]: userId }
            }
        }).catch(function(errors){
            console.log(errors);
        });

		if(nameInDB.length > 0){
			return res.render('users/userProfileEdition', {
				errors: {
					user:{
						msg: 'Este nombre de usuario ya está en uso',
					}
				},
				oldData: req.body,
				user: loggedUser
			});
		}

		// Verificar que el email no sea usado por otro usuario
		let emailInDB = await db.User.findAll({
            where:{
                email: req.body.email,
				user_id: { [ Op.not ]: userId }
            }
        }).catch(function(errors){
            console.log(errors);
        });

		if(emailInDB.length > 0){
			return res.render('users/userProfileEdition', {
				errors: {
					email:{
						msg: 'Este email ya está en uso',
					}
				},
				oldData: req.body,
				user: loggedUser
			});
		}

		// Confirmar contraseña 
		let previousPassword = bcryptjs.compareSync(req.body.password1, loggedUser.password);
		
		if(!previousPassword){
			return res.render('users/userProfileEdition', {
				errors: {
					password1: {
						msg: 'Verifica la contraseña ingresada',
					}
				},
				user: loggedUser
			});
		}

        // Actualizar usuario
		if(req.file){
            let filename = req.file.filename;

            let updatedUser = await db.User.update({
                user: req.body.user,
				name: req.body.name,
				last_name: req.body.lastName,
				email: req.body.email,
				password: bcryptjs.hashSync(req.body.password2, 10),
				image: filename,
            }, {
				where: {
					user_id: userId,
				}
			}).catch(function(errors){
                console.log(errors);
            });
        }else{
            let updatedUser = await db.User.update({
                user: req.body.user,
				name: req.body.name,
				last_name: req.body.lastName,
				email: req.body.email,
				password: bcryptjs.hashSync(req.body.password2, 10),
            },{
				where: {
					user_id: userId,
				}
			}).catch(function(errors){
                console.log(errors);
            });
        }

		let newInfoUser = await db.User.findByPk(userId)
				.catch(function(errors){
				console.log(errors);
				});

		delete newInfoUser.password;

		req.session.userLogged = newInfoUser;

		return res.render('users/userProfile',{
			user: req.session.userLogged,
		});
	},

	// Cerrar sesión
	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}
};

module.exports = usersController;