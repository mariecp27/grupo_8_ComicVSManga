const db = require('../../database/models');

let usersAPIController = {
    // Lista de los usuarios registrados para el front-end
    userList: async(req, res) => {

		let usersInDB = await db.User.findAll({})
			.catch(function(errors){
            	console.log(errors);
        });

		let users = [];
		let user = '';
		let email = '';
		let object = '';
		
		usersInDB.forEach(usersInDB => {
			user = usersInDB.dataValues.user;
			email = usersInDB.dataValues.email;

			object = {
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
	userListReact: async(req, res) => {

		let limit = 10;
		let offset = 0;

		if(req.query.page){
			 offset = limit * parseInt(req.query.page);
		}

		let usersInDB = await db.User.findAll({
			limit,
			offset
		})
			.catch(function(errors){
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
		.catch(function(errors){
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
	userDetailReact: async(req, res) => {

        let idUser = req.params.id;

		let userInDB = await db.User.findByPk(idUser)
			.catch(function(errors){
            	console.log(errors);
        });

		let id = userInDB.dataValues.user_id;
		let user  = userInDB.dataValues.user;
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
};

module.exports = usersAPIController;