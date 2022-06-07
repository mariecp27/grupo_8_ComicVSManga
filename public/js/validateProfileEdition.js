window.addEventListener('load', function(){

    let form = document.querySelector('#form');

    // Selector para el id de usuario

    let id = document.querySelector('#id');

    // Selectores para input file
    let avatar = document.querySelector('#avatar');
    let avatarL = document.querySelector('#avatarL');
    let avatarError = document.querySelector('#avatarError');
    let triangleAvatar = document.querySelector('.fa-triangle-exclamationAvatar');
    let checkAvatar = document.querySelector('.fa-circle-checkAvatar');

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

    // Selectores para input contraseña (2)
    let password3 = document.querySelector('#password3');
    let password3Error = document.querySelector('#password3Error');
    let trianglePassword3 = document.querySelector('.fa-triangle-exclamationPassword3');
    let checkPassword3 = document.querySelector('.fa-circle-checkPassword3');

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
            triangleAvatar.classList.add('triangleWarning');

            avatarL.classList.remove('valid-value');
            checkAvatar.classList.remove('circleCheck');
        }else{
            avatarError.innerHTML = '';
            avatarL.classList.remove('invalid-value');
            triangleAvatar.classList.remove('triangleWarning');

            avatarL.classList.add('valid-value');
            checkAvatar.classList.add('circleCheck');
        }
    });

    // Errores input usuario
     user.addEventListener('blur', function(){

        if(user.value == ''){
            userError.innerHTML = 'Ingresa tu nombre de usuario';

            user.classList.add('invalid-value');
            triangleUser.classList.add('triangleWarning');

            user.classList.remove('valid-value');
            checkUser.classList.remove('circleCheck');

        } else if(user.value.length > 10){
            userError.innerHTML = 'El máximo de caracteres es de 10';

            user.classList.add('invalid-value');
            triangleUser.classList.add('triangleWarning');

            user.classList.remove('valid-value');
            checkUser.classList.remove('circleCheck');

        } else if(user.value.length > 0 && user.value.length <= 10 ){
            usersInDB.forEach(userDB => {
                if(id.value != userDB.user_id){
                    if(userDB.user == user.value){
                        userError.innerHTML = 'Este nombre de usuario ya está en uso';
        
                        user.classList.add('invalid-value');
                        triangleUser.classList.add('triangleWarning');
        
                        user.classList.remove('valid-value');
                        checkUser.classList.remove('circleCheck');    
                    }
                }
            })
        }else{
            userError.innerHTML = '';
            user.classList.remove('invalid-value');
            triangleUser.classList.remove('triangleWarning');

            user.classList.add('valid-value');
            checkUser.classList.add('circleCheck');
        }
    });

    user.addEventListener('keyup', function(){
        if(/\s/.test(user.value)){
            userError.innerHTML = 'Tu nombre de usuario no debe contener espacios';

            user.classList.add('invalid-value');
            triangleUser.classList.add('triangleWarning');

            user.classList.remove('valid-value');
            checkUser.classList.remove('circleCheck');

        } else if(user.value.length > 10){
            userError.innerHTML = 'El máximo de caracteres es de 10';

            user.classList.add('invalid-value');
            triangleUser.classList.add('triangleWarning');

            user.classList.remove('valid-value');
            checkUser.classList.remove('circleCheck');

        } else{
            userError.innerHTML = '';
            user.classList.remove('invalid-value');
            triangleUser.classList.remove('triangleWarning');

            user.classList.add('valid-value');
            checkUser.classList.add('circleCheck');

        }
    });

    // Errores input nombre
    name.addEventListener('blur', function(){

        if(name.value == ''){
            nameError.innerHTML = 'Ingresa tu(s) nombre(s)';

            name.classList.add('invalid-value');
            triangleName.classList.add('triangleWarning');

            name.classList.remove('valid-value');
            checkName.classList.remove('circleCheck');

        } else if(name.value.length < 2){
            nameError.innerHTML = 'Tu nombre debe tener al menos 2 caracteres';

            name.classList.add('invalid-value');
            triangleName.classList.add('triangleWarning');

            name.classList.remove('valid-value');
            checkName.classList.remove('circleCheck');

        } else{
            nameError.innerHTML = '';
            name.classList.remove('invalid-value');
            triangleName.classList.remove('triangleWarning');

            name.classList.add('valid-value');
            checkName.classList.add('circleCheck');
        }
    });

    // Errores input apellido
    lastName.addEventListener('blur', function(){

        if(lastName.value == ''){
            lastNameError.innerHTML = 'Ingresa tu(s) apellido(s)';

            lastName.classList.add('invalid-value');
            triangleLastName.classList.add('triangleWarning');

            lastName.classList.remove('valid-value');
            checkLastName.classList.remove('circleCheck');

        } else if(lastName.value.length < 2){
            lastNameError.innerHTML = 'Tu apellido debe tener al menos 2 caracteres';

            lastName.classList.add('invalid-value');
            triangleLastName.classList.add('triangleWarning');

            lastName.classList.remove('valid-value');
            checkLastName.classList.remove('circleCheck');

        } else{
            lastNameError.innerHTML = '';
            lastName.classList.remove('invalid-value');
            triangleLastName.classList.remove('triangleWarning');

            lastName.classList.add('valid-value');
            checkLastName.classList.add('circleCheck');
        }
    });

    // Errores input email
    email.addEventListener('blur', function(){

        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if(email.value == ''){
            emailError.innerHTML = 'Escribe un correo electrónico';

            email.classList.add('invalid-value');
            triangleEmail.classList.add('triangleWarning');

            email.classList.remove('valid-value');
            checkEmail.classList.remove('circleCheck');

        } else if(!email.value.match(emailRegex)){
            emailError.innerHTML = 'Escribe un formato de correo válido';

            email.classList.add('invalid-value');
            triangleEmail.classList.add('triangleWarning');

            email.classList.remove('valid-value');
            checkEmail.classList.remove('circleCheck');

        } else if(email.value.length > 0){
            let noMatch = true;

            usersInDB.forEach(userDB => {
                if(id.value != userDB.user_id){
                    if(userDB.email == email.value){
                    
                        emailError.innerHTML = 'Este email ya está en uso';
        
                        email.classList.add('invalid-value');
                        triangleEmail.classList.add('triangleWarning');
        
                        email.classList.remove('valid-value');
                        checkEmail.classList.remove('circleCheck');
                        
                        noMatch = false;
    
                    } else if(noMatch){
                        emailError.innerHTML = '';
                        email.classList.remove('invalid-value');
                        triangleEmail.classList.remove('triangleWarning');
    
                        email.classList.add('valid-value');
                        checkEmail.classList.add('circleCheck');
                    }
                }
            })
        }else{
            emailError.innerHTML = '';
            email.classList.remove('invalid-value');
            triangleEmail.classList.remove('triangleWarning');

            email.classList.add('valid-value');
            checkEmail.classList.add('circleCheck');
        }
    });

    // Errores input contraseña (2)
    password2.addEventListener('keyup', function(){
        let passwordErrors = [];

        if(password2.value != ''){
            if(password2.value.length < 8){
                passwordErrors.push('Tu contraseña debe tener al menos 8 caracteres')
    
                password2.classList.add('invalid-value');
                trianglePassword2.classList.add('triangleWarning');
    
                password2.classList.remove('valid-value');
                checkPassword2.classList.remove('circleCheck');
            }
    
            if(!password2.value.match(/(?=.*?[a-z])/)){
                passwordErrors.push('Ingresa al menos una letra minúscula')
    
                password2.classList.add('invalid-value');
                trianglePassword2.classList.add('triangleWarning');
    
                password2.classList.remove('valid-value');
                checkPassword2.classList.remove('circleCheck');
            }
    
            if(!password2.value.match(/(?=.*?[A-Z])/)){
                passwordErrors.push('Ingresa al menos una letra mayúscula')
    
                password2.classList.add('invalid-value');
                trianglePassword2.classList.add('triangleWarning');
    
                password2.classList.remove('valid-value');
                checkPassword2.classList.remove('circleCheck');
            }
    
            if(!password2.value.match(/(?=.*?[0-9])/)){
                passwordErrors.push('Ingresa al menos un número')
    
                password2.classList.add('invalid-value');
                trianglePassword2.classList.add('triangleWarning');
    
                password2.classList.remove('valid-value');
                checkPassword2.classList.remove('circleCheck');
            }
    
            if(!password2.value.match(/(?=.*?[#?!@$%^&*-])/)){
                passwordErrors.push('Ingresa al menos un carácter especial')
    
                password2.classList.add('invalid-value');
                trianglePassword2.classList.add('triangleWarning');
    
                password2.classList.remove('valid-value');
                checkPassword2.classList.remove('circleCheck');
            }
        }

        if(passwordErrors.length > 0){
            password2Error.innerHTML = '';

            passwordErrors.forEach(error => {
                password2Error.innerHTML += '<li>' + error + '</li>';
            });
        }else if(passwordErrors.length == 0) {
            password2Error.innerHTML = '';
            password2.classList.remove('invalid-value');
            trianglePassword2.classList.remove('triangleWarning');

            password2.classList.add('valid-value');
            checkPassword2.classList.add('circleCheck');
        }
    });

    // Errores input contraseña (3)
    password3.addEventListener('keyup', function(){

        if(password2.value != password3.value){
            password3Error.innerHTML = 'Las contraseñas deben coincidir';

            password3.classList.add('invalid-value');
            trianglePassword3.classList.add('triangleWarning');

            password3.classList.remove('valid-value');
            checkPassword3.classList.remove('circleCheck');

        }else{
            password3Error.innerHTML = '';
            password3.classList.remove('invalid-value');
            trianglePassword3.classList.remove('triangleWarning');

            password3.classList.add('valid-value');
            checkPassword3.classList.add('circleCheck');
        }
    });

    // Errores input contraseña (1)
    password1.addEventListener('blur', function(){

        if(password1.value == ''){
            password1Error.innerHTML = 'Escribe una contraseña';

            password1.classList.add('invalid-value');
            trianglePassword1.classList.add('triangleWarning');

            password1.classList.remove('valid-value');
            checkPassword1.classList.remove('circleCheck');

        } else{
            password1Error.innerHTML = '';
            password1.classList.remove('invalid-value');
            trianglePassword1.classList.remove('triangleWarning');

            password1.classList.add('valid-value');
            checkPassword1.classList.add('circleCheck');
        }
    });

    // Errores generales para evitar envío del formulario
    form.addEventListener('submit', function(e){

        //Contador errores
        let errorsAmount = 0;

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
            triangleAvatar.classList.add('triangleWarning');

            avatarL.classList.remove('valid-value');
            checkAvatar.classList.remove('circleCheck');
            
            errorsAmount += 1;
        }

        // Errores input usuario
        if(user.value == ''){
            userError.innerHTML = 'Ingresa tu nombre de usuario';

            user.classList.add('invalid-value');
            triangleUser.classList.add('triangleWarning');

            user.classList.remove('valid-value');
            checkUser.classList.remove('circleCheck');

            errorsAmount += 1;

        } else if(user.value.length > 10){
            userError.innerHTML = 'El máximo de caracteres es de 10';

            user.classList.add('invalid-value');
            triangleUser.classList.add('triangleWarning');

            user.classList.remove('valid-value');
            checkUser.classList.remove('circleCheck');

            errorsAmount += 1;

        } else if(user.value.length > 0 && user.value.length <= 10 ){
            usersInDB.forEach(userDB => {
                if(id.value != userDB.user_id){
                    if(userDB.user == user.value){
                        userError.innerHTML = 'Este nombre de usuario ya está en uso';
        
                        user.classList.add('invalid-value');
                        triangleUser.classList.add('triangleWarning');
        
                        user.classList.remove('valid-value');
                        checkUser.classList.remove('circleCheck');
                        
                        errorsAmount += 1;
                    }
                }
            })
        } else if(/\s/.test(user.value)){
            userError.innerHTML = 'Tu nombre de usuario no debe contener espacios';

            user.classList.add('invalid-value');
            triangleUser.classList.add('triangleWarning');

            user.classList.remove('valid-value');
            checkUser.classList.remove('circleCheck');

            errorsAmount += 1;
        }

        // Errores input nombre
        if(name.value == ''){
            nameError.innerHTML = 'Ingresa tu(s) nombre(s)';

            name.classList.add('invalid-value');
            triangleName.classList.add('triangleWarning');

            name.classList.remove('valid-value');
            checkName.classList.remove('circleCheck');

            errorsAmount += 1;

        } else if(name.value.length < 2){
            nameError.innerHTML = 'Tu nombre debe tener al menos 2 caracteres';

            name.classList.add('invalid-value');
            triangleName.classList.add('triangleWarning');

            name.classList.remove('valid-value');
            checkName.classList.remove('circleCheck');

            errorsAmount += 1;
        }

        // Errores input apellido
        if(lastName.value == ''){
            lastNameError.innerHTML = 'Ingresa tu(s) apellido(s)';

            lastName.classList.add('invalid-value');
            triangleLastName.classList.add('triangleWarning');

            lastName.classList.remove('valid-value');
            checkLastName.classList.remove('circleCheck');

            errorsAmount += 1;

        } else if(lastName.value.length < 2){
            lastNameError.innerHTML = 'Tu apellido debe tener al menos 2 caracteres';

            lastName.classList.add('invalid-value');
            triangleLastName.classList.add('triangleWarning');

            lastName.classList.remove('valid-value');
            checkLastName.classList.remove('circleCheck');
            
            errorsAmount += 1;
        }

        // Errores input email
        const emailRegex2 = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if(email.value == ''){
            emailError.innerHTML = 'Escribe un correo electrónico';

            email.classList.add('invalid-value');
            triangleEmail.classList.add('triangleWarning');

            email.classList.remove('valid-value');
            checkEmail.classList.remove('circleCheck');
            
            errorsAmount += 1;

        } else if(!email.value.match(emailRegex2)){
            emailError.innerHTML = 'Escribe un formato de correo válido';

            email.classList.add('invalid-value');
            triangleEmail.classList.add('triangleWarning');

            email.classList.remove('valid-value');
            checkEmail.classList.remove('circleCheck');

            errorsAmount += 1;

        } else if(email.value.length > 0){
            usersInDB.forEach(userDB => {
                if(id.value != userDB.user_id){
                    if(userDB.email == email.value){
                        emailError.innerHTML = 'Este email ya está en uso';
        
                        email.classList.add('invalid-value');
                        triangleEmail.classList.add('triangleWarning');
        
                        email.classList.remove('valid-value');
                        checkEmail.classList.remove('circleCheck');
                        
                        noMatch = false;
    
                        errorsAmount += 1;
                    }
                }
            })
        }

        // Errores input contraseña (2)
        let passwordErrorsT = [];

        if(password2.value != ''){
            if(password2.value.length < 8){
                passwordErrorsT.push('Tu contraseña debe tener al menos 8 caracteres')
    
                password2.classList.add('invalid-value');
                trianglePassword2.classList.add('triangleWarning');
    
                password2.classList.remove('valid-value');
                checkPassword2.classList.remove('circleCheck');
    
                errorsAmount += 1;
    
            }
            
            if(!password2.value.match(/(?=.*?[a-z])/)){
                passwordErrorsT.push('Ingresa al menos una letra minúscula')
    
                password2.classList.add('invalid-value');
                trianglePassword2.classList.add('triangleWarning');
    
                password2.classList.remove('valid-value');
                checkPassword2.classList.remove('circleCheck');
    
                errorsAmount += 1;
    
            }
            
            if(!password2.value.match(/(?=.*?[A-Z])/)){
                passwordErrorsT.push('Ingresa al menos una letra mayúscula')
    
                password2.classList.add('invalid-value');
                trianglePassword2.classList.add('triangleWarning');
    
                password2.classList.remove('valid-value');
                checkPassword2.classList.remove('circleCheck');
    
                errorsAmount += 1;
    
            }
            
            if(!password2.value.match(/(?=.*?[0-9])/)){
                passwordErrorsT.push('Ingresa al menos un número')
    
                password2.classList.add('invalid-value');
                trianglePassword2.classList.add('triangleWarning');
    
                password2.classList.remove('valid-value');
                checkPassword2.classList.remove('circleCheck');
    
                errorsAmount += 1;
    
            }
            
            if(!password2.value.match(/(?=.*?[#?!@$%^&*-])/)){
                passwordErrorsT.push('Ingresa al menos un carácter especial')
    
                password2.classList.add('invalid-value');
                trianglePassword2.classList.add('triangleWarning');
    
                password2.classList.remove('valid-value');
                checkPassword2.classList.remove('circleCheck');
    
                errorsAmount += 1;
            }
        }

        // Errores input contraseña (3)
        if(password2.value != '' && password3.value == ''){
            password3Error.innerHTML = 'Confirma la contraseña';

            password3.classList.add('invalid-value');
            trianglePassword3.classList.add('triangleWarning');

            password3.classList.remove('valid-value');
            checkPassword3.classList.remove('circleCheck');
            
            errorsAmount += 1;

        }else if(password2.value != password3.value){
            password3Error.innerHTML = 'Las contraseñas deben coincidir';

            password3.classList.add('invalid-value');
            trianglePassword3.classList.add('triangleWarning');

            password3.classList.remove('valid-value');
            checkPassword3.classList.remove('circleCheck');

            errorsAmount += 1;
        }

        // Errores input contraseña (1)
        if(password1.value == ''){
            password1Error.innerHTML = 'Escribe una contraseña';
    
            password1.classList.add('invalid-value');
            trianglePassword1.classList.add('triangleWarning');
    
            password1.classList.remove('valid-value');
            checkPassword1.classList.remove('circleCheck');

            errorsAmount += 1;
        } 

        if(errorsAmount > 0){
            e.preventDefault();
        }
    })
})