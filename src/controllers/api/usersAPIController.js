const db = require('../../database/models');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

let usersAPIController = {
	// Lista de los usuarios registrados para el front-end
	userList: async (req, res) => {

		let usersInDB = await db.User.findAll({})
			.catch(function (errors) {
				console.log(errors);
			});

		let users = [];
		user_id = 0;
		let user = '';
		let email = '';
		let object = '';

		usersInDB.forEach(usersInDB => {
			user_id = usersInDB.dataValues.user_id;
			user = usersInDB.dataValues.user;
			email = usersInDB.dataValues.email;

			object = {
				user_id: user_id,
				user: user,
				email: email
			}

			users.push(object);
		});

		return res.status(200).json({
			data: users,
			status: 200
		});
	},

	// Lista de los usuarios registrados para React
	userListReact: async (req, res) => {

		let limit = 10;
		let offset = 0;

		if (req.query.page) {
			offset = limit * parseInt(req.query.page);
		}

		let usersInDB = await db.User.findAll({
			limit,
			offset
		})
			.catch(function (errors) {
				console.log(errors);
			});

		let users = [];
		let id = '';
		let name = '';
		let lastName = '';
		let email = '';
		let detail = '';
		let counter = 0;

		usersInDB.forEach(usersInDB => {
			id = usersInDB.dataValues.user_id;
			name = usersInDB.dataValues.name;
			lastName = usersInDB.dataValues.last_name;
			email = usersInDB.dataValues.email;
			detail = `${process.env.API_LINK}/api/users/${id}`;

			object = {
				id: id,
				name: name,
				lastName: lastName,
				email: email,
				detail: detail
			}

			users.push(object);
		});

		let usersInDBAll = await db.User.findAll()
			.catch(function (errors) {
				console.log(errors);
			});

		usersInDBAll.forEach(usersInDB => counter += 1);

		return res.status(200).json({
			count: counter,
			users: users,
			status: 200
		});
	},

	// Detalle de los usuarios registrados para React
	userDetailReact: async (req, res) => {

		let idUser = req.params.id;

		let userInDB = await db.User.findByPk(idUser)
			.catch(function (errors) {
				console.log(errors);
			});

		let id = userInDB.dataValues.user_id;
		let user = userInDB.dataValues.user;
		let name = userInDB.dataValues.name;
		let lastName = userInDB.dataValues.last_name;
		let email = userInDB.dataValues.email;
		let image = `${process.env.API_LINK}/images/users/${userInDB.dataValues.image}`;


		return res.status(200).json({
			id,
			user,
			name,
			lastName,
			email,
			image,
			status: 200
		});
	},

	// Creación token para login.
	tokenCreation: async (req, res) => {

		if(!req.body.email || !req.body.password){
			res.status(401).json({
				error: 'Ingresa tus datos'
			});
		}

		let adminInDB = await db.User.findOne({
			where: {
				user_type_id: 2,
				email: req.body.email
			}
		}).catch(function (errors) {
			console.log(errors);
		});

		if (adminInDB){
			let passwordProvided = bcryptjs.compareSync(req.body.password, adminInDB.password);

			if (passwordProvided) {

				const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });

				return res.status(200).json({
					token,
					expiresIn: 3600
				});
			} else {
				return res.status(401).json({
					error: 'Verifica los datos ingresados'
				});
			}
		}

		if(req.body.email){
			return res.status(401).json({
				error: 'Este correo no se encuentra en nuestra base de datos de administradores'
			});
		}
	},

	// Validación token para login.
	tokenVerification: async (req, res) => {

		const token = req.headers['authorization'];

		let adminEmail = '';

		if (!token){
			res.status(401).json({
				error: 'Ingresa tus datos'
			});
		} else{
			jwt.verify(token, 'secret', function (err, decoded) {
				if (err) {
					res.status(401).json({
						error: 'No tienes permiso de acceso'
					});
				} else{
					adminEmail =  decoded.email;
				}
			});
		}

		if(adminEmail != ''){
			let userToLogin = await db.User.findOne({
				where: {
					email: adminEmail,
				}
			}).catch(function (errors) {
				console.log(errors);
			});
	
			res.status(200).json({
				user: userToLogin.user,
				email: userToLogin.email
			});
		}
	}

};

module.exports = usersAPIController;