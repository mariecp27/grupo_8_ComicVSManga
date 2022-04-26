function onlyAdminMiddleware(req, res, next) {
	if (req.session.userLogged && req.session.userLogged.userType == 'administrator') {
		next();
	}

	res.render('admin/unauthorized');
}

module.exports = onlyAdminMiddleware;