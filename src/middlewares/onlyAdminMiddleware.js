function onlyAdminMiddleware(req, res, next) {
	if (req.session.userLogged && req.session.userLogged.user_type_id == 2) {
		return next();
	}

	res.render('admin/unauthorized');
}

module.exports = onlyAdminMiddleware;