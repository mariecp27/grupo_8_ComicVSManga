window.addEventListener('load', function(){

    let form = document.querySelector('#form');

    // Selectores para input email
    let email = document.querySelector('#email');
    let emailError = document.querySelector('#emailError');
    let triangleEmail = document.querySelector('.fa-triangle-exclamationEmail');
    let checkEmail = document.querySelector('.fa-circle-checkEmail');

    // Selectores para input contraseña
    let password = document.querySelector('#password');
    let passwordError = document.querySelector('#passwordError');
    let trianglePassword = document.querySelector('.fa-triangle-exclamationPassword');
    let checkPassword = document.querySelector('.fa-circle-checkPassword');

    // Información Api usuarios registrados
    let usersInDB = [];

    let url = '';

    if(document.URL.startsWith('http://localhost')){
        url = 'localhost:3030';
    } else{
        url = 'comic-vs-manga.herokuapp.com';
    }

    fetch(`http://${url}/api/users/usersList`)
    .then(function(response){
        return response.json();
    })
    .then(function(users){
        users.data.forEach(user => {
            usersInDB.push(user);
        });
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
                if(userDB.email == email.value){
                    noMatch = false;
                }
            })

            if(noMatch){
                emailError.innerHTML = 'Este correo no se encuentra en nuestra base de datos';

                email.classList.add('invalid-value');
                triangleEmail.classList.add('triangleWarning');

                email.classList.remove('valid-value');
                checkEmail.classList.remove('circleCheck');

            } else if(!noMatch){
                emailError.innerHTML = '';
                email.classList.remove('invalid-value');
                triangleEmail.classList.remove('triangleWarning');

                email.classList.add('valid-value');
                checkEmail.classList.add('circleCheck');
            }

        }else{
            emailError.innerHTML = '';
            email.classList.remove('invalid-value');
            triangleEmail.classList.remove('triangleWarning');

            email.classList.add('valid-value');
            checkEmail.classList.add('circleCheck');
        }
    });

    // Errores input contraseña
    password.addEventListener('blur', function(){

        if(password.value == ''){
            passwordError.innerHTML = 'Escribe una contraseña';

            password.classList.add('invalid-value');
            trianglePassword.classList.add('triangleWarning');

            password.classList.remove('valid-value');
            checkPassword.classList.remove('circleCheck');
        }else{
            passwordError.innerHTML = '';
            password.classList.remove('invalid-value');
            trianglePassword.classList.remove('triangleWarning');

            password.classList.add('valid-value');
            checkPassword.classList.add('circleCheck');
        }
    });


    // Errores generales para evitar envío del formulario
    form.addEventListener('submit', function(e){

        //Contador errores
        let errorsAmount = 0;

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

            let noMatchF = true;

            usersInDB.forEach(userDB => {
                if(userDB.email == email.value){
                    noMatchF = false;
                }
            })


            if(noMatchF){
                emailError.innerHTML = 'Este correo no se encuentra en nuestra base de datos';

                email.classList.add('invalid-value');
                triangleEmail.classList.add('triangleWarning');

                email.classList.remove('valid-value');
                checkEmail.classList.remove('circleCheck');

                errorsAmount += 1;
            }
        }

        // Errores input contraseña
        if(password.value == ''){
            passwordError.innerHTML = 'Escribe una contraseña';

            password.classList.add('invalid-value');
            trianglePassword.classList.add('triangleWarning');

            password.classList.remove('valid-value');
            checkPassword.classList.remove('circleCheck');
            
            errorsAmount += 1;
        }

        if(errorsAmount > 0){
            e.preventDefault();
        }
    })
})