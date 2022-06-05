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

		return res.status(200).json({
			data: usersInDB,
			status: 200
		});
	}	
};

module.exports = usersAPIController;