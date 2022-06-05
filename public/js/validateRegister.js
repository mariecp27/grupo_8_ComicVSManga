window.addEventListener('load', function(){

    let form = document.querySelector('#form');

    // Selectores para input usuario
    let user = document.querySelector('#user');
    let userError = document.querySelector('#userError');
    let triangleUser = document.querySelector('.fa-triangle-exclamationUser');
    let checkUser = document.querySelector('.fa-circle-checkUser');

    // Selectores para input nombre
    let name = document.querySelector('#name');
    let nameError = document.querySelector('#nameError');
    let triangleName = document.querySelector('.fa-triangle-exclamationName');
    let checkName = document.querySelector('.fa-circle-checkName');

    // Selectores para input apellido
    let lastName = document.querySelector('#lastName');
    let lastNameError = document.querySelector('#lastNameError');
    let triangleLastName = document.querySelector('.fa-triangle-exclamationLastName');
    let checkLastName = document.querySelector('.fa-circle-checkLastName');

    // Selectores para input email
    let email = document.querySelector('#email');
    let emailError = document.querySelector('#emailError');
    let triangleEmail = document.querySelector('.fa-triangle-exclamationEmail');
    let checkEmail = document.querySelector('.fa-circle-checkEmail');

    // Selectores para input contraseña (1)
    let password1 = document.querySelector('#password1');
    let password1Error = document.querySelector('#password1Error');
    let trianglePassword1 = document.querySelector('.fa-triangle-exclamationPassword1');
    let checkPassword1 = document.querySelector('.fa-circle-checkPassword1');

    // Selectores para input contraseña (2)
    let password2 = document.querySelector('#password2');
    let password2Error = document.querySelector('#password2Error');
    let trianglePassword2 = document.querySelector('.fa-triangle-exclamationPassword2');
    let checkPassword2 = document.querySelector('.fa-circle-checkPassword2');

    // Selectores para input file (2)
    let avatar = document.querySelector('#avatar');
    let avatarL = document.querySelector('#avatarL');
    let avatarError = document.querySelector('#avatarError');
    let triangleAvatar = document.querySelector('.fa-triangle-exclamationAvatar');
    let checkAvatar = document.querySelector('.fa-circle-checkAvatar');

    // Información Api usuarios registrados
    let usersInDB = [];

    fetch('http://localhost:3030/api/users/usersList')
    .then(function(response){
        return response.json();
    })
    .then(function(users){
        users.data.forEach(user => {
            usersInDB.push(user);
        });
    });

    // Errores input usuario
    user.addEventListener('blur', function(){

        if(user.value == ''){
            userError.innerHTML = 'Ingresa tu nombre de usuario';

            user.classList.add('invalid-value');
            triangleUser.classList.add('triangleUser');

            user.classList.remove('valid-value');
            checkUser.classList.remove('checkUser');

        } else if(user.value.length > 10){
            userError.innerHTML = 'El máximo de caracteres es de 10';

            user.classList.add('invalid-value');
            triangleUser.classList.add('triangleUser');

            user.classList.remove('valid-value');
            checkUser.classList.remove('checkUser');

        } else if(user.value.length > 0 && user.value.length <= 10 ){
            usersInDB.forEach(userDB => {
                if(userDB.user == user.value){
                    userError.innerHTML = 'Este nombre de usuario ya está en uso';
    
                    user.classList.add('invalid-value');
                    triangleUser.classList.add('triangleUser');
    
                    user.classList.remove('valid-value');
                    checkUser.classList.remove('checkUser');    
                }
            })
        }else{
            userError.innerHTML = '';
            user.classList.remove('invalid-value');
            triangleUser.classList.remove('triangleUser');

            user.classList.add('valid-value');
            checkUser.classList.add('checkUser');
        }
    });

    user.addEventListener('keyup', function(){
        if(/\s/.test(user.value)){
            userError.innerHTML = 'Tu nombre de usuario no debe contener espacios';

            user.classList.add('invalid-value');
            triangleUser.classList.add('triangleUser');

            user.classList.remove('valid-value');
            checkUser.classList.remove('checkUser');

        } else if(user.value.length > 10){
            userError.innerHTML = 'El máximo de caracteres es de 10';

            user.classList.add('invalid-value');
            triangleUser.classList.add('triangleUser');

            user.classList.remove('valid-value');
            checkUser.classList.remove('checkUser');

        } else{
            userError.innerHTML = '';
            user.classList.remove('invalid-value');
            triangleUser.classList.remove('triangleUser');

            user.classList.add('valid-value');
            checkUser.classList.add('checkUser');

        }
    });

    // Errores input nombre
    name.addEventListener('blur', function(){

        if(name.value == ''){
            nameError.innerHTML = 'Ingresa tu(s) nombre(s)';

            name.classList.add('invalid-value');
            triangleName.classList.add('triangleUser');

            name.classList.remove('valid-value');
            checkName.classList.remove('checkUser');

        } else if(name.value.length < 2){
            nameError.innerHTML = 'Tu nombre debe tener al menos 2 caracteres';

            name.classList.add('invalid-value');
            triangleName.classList.add('triangleUser');

            name.classList.remove('valid-value');
            checkName.classList.remove('checkUser');

        } else{
            nameError.innerHTML = '';
            name.classList.remove('invalid-value');
            triangleName.classList.remove('triangleUser');

            name.classList.add('valid-value');
            checkName.classList.add('checkUser');
        }
    });

    // Errores input apellido
    lastName.addEventListener('blur', function(){

        if(lastName.value == ''){
            lastNameError.innerHTML = 'Ingresa tu(s) apellido(s)';

            lastName.classList.add('invalid-value');
            triangleLastName.classList.add('triangleUser');

            lastName.classList.remove('valid-value');
            checkLastName.classList.remove('checkUser');

        } else if(lastName.value.length < 2){
            lastNameError.innerHTML = 'Tu apellido debe tener al menos 2 caracteres';

            lastName.classList.add('invalid-value');
            triangleLastName.classList.add('triangleUser');

            lastName.classList.remove('valid-value');
            checkLastName.classList.remove('checkUser');

        } else{
            lastNameError.innerHTML = '';
            lastName.classList.remove('invalid-value');
            triangleLastName.classList.remove('triangleUser');

            lastName.classList.add('valid-value');
            checkLastName.classList.add('checkUser');
        }
    });

    // Errores input email
    email.addEventListener('blur', function(){

        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if(email.value == ''){
            emailError.innerHTML = 'Escribe un correo electrónico';

            email.classList.add('invalid-value');
            triangleEmail.classList.add('triangleUser');

            email.classList.remove('valid-value');
            checkEmail.classList.remove('checkUser');

        } else if(!email.value.match(emailRegex)){
            emailError.innerHTML = 'Escribe un formato de correo válido';

            email.classList.add('invalid-value');
            triangleEmail.classList.add('triangleUser');

            email.classList.remove('valid-value');
            checkEmail.classList.remove('checkUser');

        } else if(email.value.length > 0){
            let noMatch = true;

            usersInDB.forEach(userDB => {
                if(userDB.email == email.value){
                    emailError.innerHTML = 'Este email ya está en uso';
    
                    email.classList.add('invalid-value');
                    triangleEmail.classList.add('triangleUser');
    
                    email.classList.remove('valid-value');
                    checkEmail.classList.remove('checkUser');
                    
                    noMatch = false;

                }else if(noMatch){
                    emailError.innerHTML = '';
                    email.classList.remove('invalid-value');
                    triangleEmail.classList.remove('triangleUser');

                    email.classList.add('valid-value');
                    checkEmail.classList.add('checkUser');
                }
            })
        }else{
            emailError.innerHTML = '';
            email.classList.remove('invalid-value');
            triangleEmail.classList.remove('triangleUser');

            email.classList.add('valid-value');
            checkEmail.classList.add('checkUser');
        }
    });

    // Errores input contraseña (1)
    password1.addEventListener('blur', function(){

        if(password1.value == ''){
            password1Error.innerHTML = 'Escribe una contraseña';

            password1.classList.add('invalid-value');
            trianglePassword1.classList.add('triangleUser');

            password1.classList.remove('valid-value');
            checkPassword1.classList.remove('checkUser');

        }
    });

    password1.addEventListener('keyup', function(){
        let passwordErrors = [];

        if(password1.value.length < 8){
            passwordErrors.push('Tu contraseña debe tener al menos 8 caracteres')

            password1.classList.add('invalid-value');
            trianglePassword1.classList.add('triangleUser');

            password1.classList.remove('valid-value');
            checkPassword1.classList.remove('checkUser');
        }

        if(!password1.value.match(/(?=.*?[a-z])/)){
            passwordErrors.push('Ingresa al menos una letra minúscula')

            password1.classList.add('invalid-value');
            trianglePassword1.classList.add('triangleUser');

            password1.classList.remove('valid-value');
            checkPassword1.classList.remove('checkUser');
        }

        if(!password1.value.match(/(?=.*?[A-Z])/)){
            passwordErrors.push('Ingresa al menos una letra mayúscula')

            password1.classList.add('invalid-value');
            trianglePassword1.classList.add('triangleUser');

            password1.classList.remove('valid-value');
            checkPassword1.classList.remove('checkUser');
        }

        if(!password1.value.match(/(?=.*?[0-9])/)){
            passwordErrors.push('Ingresa al menos un número')

            password1.classList.add('invalid-value');
            trianglePassword1.classList.add('triangleUser');

            password1.classList.remove('valid-value');
            checkPassword1.classList.remove('checkUser');
        }

        if(!password1.value.match(/(?=.*?[#?!@$%^&*-])/)){
            passwordErrors.push('Ingresa al menos un carácter especial')

            password1.classList.add('invalid-value');
            trianglePassword1.classList.add('triangleUser');

            password1.classList.remove('valid-value');
            checkPassword1.classList.remove('checkUser');
        }

        if(passwordErrors.length > 0){
            password1Error.innerHTML = '';

            passwordErrors.forEach(error => {
                password1Error.innerHTML += '<li>' + error + '</li>';
            });
        }else if(passwordErrors.length == 0) {
            password1Error.innerHTML = '';
            password1.classList.remove('invalid-value');
            trianglePassword1.classList.remove('triangleUser');

            password1.classList.add('valid-value');
            checkPassword1.classList.add('checkUser');
        }
    });

    // Errores input contraseña (2)
    password2.addEventListener('blur', function(){

        if(password2.value == ''){
            password2Error.innerHTML = 'Confirma la contraseña';

            password2.classList.add('invalid-value');
            trianglePassword2.classList.add('triangleUser');

            password2.classList.remove('valid-value');
            checkPassword2.classList.remove('checkUser');

        }
    });

    password2.addEventListener('keyup', function(){

        if(password1.value != password2.value){
            password2Error.innerHTML = 'Las contraseñas deben coincidir';

            password2.classList.add('invalid-value');
            trianglePassword2.classList.add('triangleUser');

            password2.classList.remove('valid-value');
            checkPassword2.classList.remove('checkUser');

        }else{
            password2Error.innerHTML = '';
            password2.classList.remove('invalid-value');
            trianglePassword2.classList.remove('triangleUser');

            password2.classList.add('valid-value');
            checkPassword2.classList.add('checkUser');
        }
    });

    // Errores input file
    avatar.addEventListener('change', function(){

        let fileName = avatar.value;
        
        let fileExtension = fileName.split('.');

        let extension = fileExtension[fileExtension.length - 1];

		let acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

        let extensionMatch = false;

        acceptedExtensions.forEach(extensionA => {
            if(extensionA == extension){
                extensionMatch = true;
            }
        })

        if(!extensionMatch){
            avatarError.innerHTML = 'Las extensiones de archivo permitidas son .jpg, .jpeg, .png y .gif';
            avatarL.classList.add('invalid-value');
            triangleAvatar.classList.add('triangleUser');

            avatarL.classList.remove('valid-value');
            checkAvatar.classList.remove('checkUser');
        }else{
            avatarError.innerHTML = '';
            avatarL.classList.remove('invalid-value');
            triangleAvatar.classList.remove('triangleUser');

            avatarL.classList.add('valid-value');
            checkAvatar.classList.add('checkUser');
        }
    });


    // Errores generales para evitar envío del formulario
    form.addEventListener('submit', function(e){

        //Contador errores
        let errorsAmount = 0;

        // Errores input usuario
        if(user.value == ''){
            userError.innerHTML = 'Ingresa tu nombre de usuario';

            user.classList.add('invalid-value');
            triangleUser.classList.add('triangleUser');

            user.classList.remove('valid-value');
            checkUser.classList.remove('checkUser');

            errorsAmount += 1;

        } else if(user.value.length > 10){
            userError.innerHTML = 'El máximo de caracteres es de 10';

            user.classList.add('invalid-value');
            triangleUser.classList.add('triangleUser');

            user.classList.remove('valid-value');
            checkUser.classList.remove('checkUser');

            errorsAmount += 1;

        } else if(user.value.length > 0 && user.value.length <= 10 ){
            usersInDB.forEach(userDB => {
                if(userDB.user == user.value){
                    userError.innerHTML = 'Este nombre de usuario ya está en uso';
    
                    user.classList.add('invalid-value');
                    triangleUser.classList.add('triangleUser');
    
                    user.classList.remove('valid-value');
                    checkUser.classList.remove('checkUser');
                    
                    errorsAmount += 1;
                }
            })
        } else if(/\s/.test(user.value)){
            userError.innerHTML = 'Tu nombre de usuario no debe contener espacios';

            user.classList.add('invalid-value');
            triangleUser.classList.add('triangleUser');

            user.classList.remove('valid-value');
            checkUser.classList.remove('checkUser');

            errorsAmount += 1;
        }
        
        // Errores input nombre
        if(name.value == ''){
            nameError.innerHTML = 'Ingresa tu(s) nombre(s)';

            name.classList.add('invalid-value');
            triangleName.classList.add('triangleUser');

            name.classList.remove('valid-value');
            checkName.classList.remove('checkUser');

            errorsAmount += 1;

        } else if(name.value.length < 2){
            nameError.innerHTML = 'Tu nombre debe tener al menos 2 caracteres';

            name.classList.add('invalid-value');
            triangleName.classList.add('triangleUser');

            name.classList.remove('valid-value');
            checkName.classList.remove('checkUser');

            errorsAmount += 1;
        }

        // Errores input apellido
        if(lastName.value == ''){
            lastNameError.innerHTML = 'Ingresa tu(s) apellido(s)';

            lastName.classList.add('invalid-value');
            triangleLastName.classList.add('triangleUser');

            lastName.classList.remove('valid-value');
            checkLastName.classList.remove('checkUser');

            errorsAmount += 1;

        } else if(lastName.value.length < 2){
            lastNameError.innerHTML = 'Tu apellido debe tener al menos 2 caracteres';

            lastName.classList.add('invalid-value');
            triangleLastName.classList.add('triangleUser');

            lastName.classList.remove('valid-value');
            checkLastName.classList.remove('checkUser');
            
            errorsAmount += 1;
        }

        // Errores input email
        const emailRegex2 = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if(email.value == ''){
            emailError.innerHTML = 'Escribe un correo electrónico';

            email.classList.add('invalid-value');
            triangleEmail.classList.add('triangleUser');

            email.classList.remove('valid-value');
            checkEmail.classList.remove('checkUser');
            
            errorsAmount += 1;

        } else if(!email.value.match(emailRegex2)){
            emailError.innerHTML = 'Escribe un formato de correo válido';

            email.classList.add('invalid-value');
            triangleEmail.classList.add('triangleUser');

            email.classList.remove('valid-value');
            checkEmail.classList.remove('checkUser');

            errorsAmount += 1;

        } else if(email.value.length > 0){
            usersInDB.forEach(userDB => {
                if(userDB.email == email.value){
                    emailError.innerHTML = 'Este email ya está en uso';
    
                    email.classList.add('invalid-value');
                    triangleEmail.classList.add('triangleUser');
    
                    email.classList.remove('valid-value');
                    checkEmail.classList.remove('checkUser');
                    
                    noMatch = false;

                    errorsAmount += 1;
                }
            })
        }

        // Errores input contraseña (1)
        let passwordErrorsT = [];

        if(password1.value == ''){
            password1Error.innerHTML = 'Escribe una contraseña';

            password1.classList.add('invalid-value');
            trianglePassword1.classList.add('triangleUser');

            password1.classList.remove('valid-value');
            checkPassword1.classList.remove('checkUser');
            
            errorsAmount += 1;

        } else{
            if(password1.value.length < 8){
                passwordErrorsT.push('Tu contraseña debe tener al menos 8 caracteres')
    
                password1.classList.add('invalid-value');
                trianglePassword1.classList.add('triangleUser');
    
                password1.classList.remove('valid-value');
                checkPassword1.classList.remove('checkUser');
    
                errorsAmount += 1;
    
            }
            
            if(!password1.value.match(/(?=.*?[a-z])/)){
                passwordErrorsT.push('Ingresa al menos una letra minúscula')
    
                password1.classList.add('invalid-value');
                trianglePassword1.classList.add('triangleUser');
    
                password1.classList.remove('valid-value');
                checkPassword1.classList.remove('checkUser');
    
                errorsAmount += 1;
    
            }
            
            if(!password1.value.match(/(?=.*?[A-Z])/)){
                passwordErrorsT.push('Ingresa al menos una letra mayúscula')
    
                password1.classList.add('invalid-value');
                trianglePassword1.classList.add('triangleUser');
    
                password1.classList.remove('valid-value');
                checkPassword1.classList.remove('checkUser');
    
                errorsAmount += 1;
    
            }
            
            if(!password1.value.match(/(?=.*?[0-9])/)){
                passwordErrorsT.push('Ingresa al menos un número')
    
                password1.classList.add('invalid-value');
                trianglePassword1.classList.add('triangleUser');
    
                password1.classList.remove('valid-value');
                checkPassword1.classList.remove('checkUser');
    
                errorsAmount += 1;
    
            }
            
            if(!password1.value.match(/(?=.*?[#?!@$%^&*-])/)){
                passwordErrorsT.push('Ingresa al menos un carácter especial')
    
                password1.classList.add('invalid-value');
                trianglePassword1.classList.add('triangleUser');
    
                password1.classList.remove('valid-value');
                checkPassword1.classList.remove('checkUser');
    
                errorsAmount += 1;
            }
        }

        // Errores input contraseña (2)
        if(password2.value == ''){
            password2Error.innerHTML = 'Confirma la contraseña';

            password2.classList.add('invalid-value');
            trianglePassword2.classList.add('triangleUser');

            password2.classList.remove('valid-value');
            checkPassword2.classList.remove('checkUser');
            
            errorsAmount += 1;

        }else if(password1.value != password2.value){
            password2Error.innerHTML = 'Las contraseñas deben coincidir';

            password2.classList.add('invalid-value');
            trianglePassword2.classList.add('triangleUser');

            password2.classList.remove('valid-value');
            checkPassword2.classList.remove('checkUser');

            errorsAmount += 1;
        }

        // Errores input file
        let fileNameF = avatar.value;
            
        let fileExtensionF = fileNameF.split('.');

        let extensionF = fileExtensionF[fileExtensionF.length - 1];

        let acceptedExtensionsF = ['jpg', 'jpeg', 'png', 'gif', ''];

        let extensionMatchF = false;

        acceptedExtensionsF.forEach(extensionA => {
            if(extensionA == extensionF){
                extensionMatchF = true;
            }
        })

        if(!extensionMatchF){
            avatarError.innerHTML = 'Las extensiones de archivo permitidas son .jpg, .jpeg, .png y .gif';
            avatarL.classList.add('invalid-value');
            triangleAvatar.classList.add('triangleUser');

            avatarL.classList.remove('valid-value');
            checkAvatar.classList.remove('checkUser');
            
            errorsAmount += 1;
        }

        if(errorsAmount > 0){
            e.preventDefault();

            if(passwordErrorsT.length > 0){
                password1Error.innerHTML = '';
    
                passwordErrorsT.forEach(error => {
                    password1Error.innerHTML += '<li>' + error + '</li>';
                });
            } 
        }
    })
})