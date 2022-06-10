const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../../database/models');
const Op = db.Sequelize.Op;

let usersAPIController = {
    // Lista de los usuarios registrados
    userList: async(req, res) => {

		let usersInDB = await db.User.findAll()
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
	}	
};

module.exports = usersAPIController;