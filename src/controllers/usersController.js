let usersController = {
    login: (req, res) =>{
        return res.render('users/login',{
            title: 'Inicio de Sesión',
        });
    },
    registro: (req, res) =>{
        return res.render('users/register',{
            title: 'Registro',
        });
    },
};

module.exports = usersController;