let usersController = {
    login: (req, res) =>{
        return res.render('users/login');
    },
    registro: (req, res) =>{
        return res.render('users/register');
    },
};

module.exports = usersController;