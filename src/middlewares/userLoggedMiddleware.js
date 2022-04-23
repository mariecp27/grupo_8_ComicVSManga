const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

	let emailInCookie = req.cookies.userEmail;

	let userFromCookie = users.find(user => user.email == emailInCookie);
	
	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = userLoggedMiddleware;