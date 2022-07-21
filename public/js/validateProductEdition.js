window.addEventListener('load', function(){

    let form = document.querySelector('#form');

    // Selectores para input nombre
    let name = document.querySelector('#name');
    let nameError = document.querySelector('#nameError');
    let triangleName = document.querySelector('.fa-triangle-exclamationName');
    let checkName = document.querySelector('.fa-circle-checkName');

    // Selectores para input descripción
    let description = document.querySelector('#description');
    let descriptionError = document.querySelector('#descriptionError');
    let triangleDescription = document.querySelector('.fa-triangle-exclamationDescription');
    let checkDescription = document.querySelector('.fa-circle-checkDescription');

    // Selectores para input imagen
    let image = document.querySelector('#image');
    let imageL = document.querySelector('#imageL');
    let imageError = document.querySelector('#imageError');
    let triangleImage = document.querySelector('.fa-triangle-exclamationImage');
    let checkImage = document.querySelector('.fa-circle-checkImage');

    // Selectores para input categoría
    let categories = document.querySelectorAll('.category');
    let categoryL = document.querySelector('#categoryL');
    let categoryError = document.querySelector('#categoryError');
    let triangleCategory = document.querySelector('.fa-triangle-exclamationCategory');
    let checkCategory = document.querySelector('.fa-circle-checkCategory');

    // Selectores para input autores
    let author = document.querySelector('#author');
    let authorError = document.querySelector('#authorError');
    let triangleAuthor = document.querySelector('.fa-triangle-exclamationAuthor');
    let checkAuthor = document.querySelector('.fa-circle-checkAuthor');

    // Selectores para input formato
    let format = document.querySelector('#format');
    let formatError = document.querySelector('#formatError');
    let triangleFormat = document.querySelector('.fa-triangle-exclamationFormat');
    let checkFormat = document.querySelector('.fa-circle-checkFormat');

    // Selectores para input páginas
    let pages = document.querySelector('#pages');
    let pagesError = document.querySelector('#pagesError');
    let trianglePages = document.querySelector('.fa-triangle-exclamationPages');
    let checkPages = document.querySelector('.fa-circle-checkPages');

    // Selectores para input precio
    let price = document.querySelector('#price');
    let priceError = document.querySelector('#priceError');
    let trianglePrice = document.querySelector('.fa-triangle-exclamationPrice');
    let checkPrice = document.querySelector('.fa-circle-checkPrice');

    // Selectores para input descuento
    let onSale = document.querySelector('#onSale');
    let discount = document.querySelector('#discount');
    let discountError = document.querySelector('#discountError');
    let triangleDiscount = document.querySelector('.fa-triangle-exclamationDiscount');
    let checkDiscount = document.querySelector('.fa-circle-checkDiscount');

    // Selectores para input stock
    let stock = document.querySelector('#stock');
    let stockError = document.querySelector('#stockError');
    let triangleStock = document.querySelector('.fa-triangle-exclamationStock');
    let checkStock = document.querySelector('.fa-circle-checkStock');

    // Errores input nombre
    name.addEventListener('blur', function(){

        if(name.value == ''){
            nameError.innerHTML = 'Ingresa el nombre del producto';

            name.classList.add('invalid-value');
            triangleName.classList.add('triangleWarning');

            name.classList.remove('valid-value');
            checkName.classList.remove('circleCheck');

        } else if(name.value.length < 5){
            nameError.innerHTML = 'El nombre del producto debe tener al menos 5 caracteres';

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

    // Errores input descripción
    description.addEventListener('blur', function(){

        if(description.value == ''){
            descriptionError.innerHTML = 'Ingresa la descripción del producto';

            description.classList.add('invalid-value');
            triangleDescription.classList.add('triangleWarning');

            description.classList.remove('valid-value');
            checkDescription.classList.remove('circleCheck');

        } else if(description.value.length < 20){
            descriptionError.innerHTML = 'La descripción del producto debe tener al menos 20 caracteres';

            description.classList.add('invalid-value');
            triangleDescription.classList.add('triangleWarning');

            description.classList.remove('valid-value');
            checkDescription.classList.remove('circleCheck');

        } else{
            descriptionError.innerHTML = '';
            description.classList.remove('invalid-value');
            triangleDescription.classList.remove('triangleWarning');

            description.classList.add('valid-value');
            checkDescription.classList.add('circleCheck');
        }
    });

    // Errores input imagen
    image.addEventListener('change', function(){

        let fileName = image.value;
        
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
            imageError.innerHTML = 'Las extensiones de archivo permitidas son .jpg, .jpeg, .png y .gif';
            imageL.classList.add('invalid-value');
            triangleImage.classList.add('triangleWarning');

            imageL.classList.remove('valid-value');
            checkImage.classList.remove('circleCheck');
        }else{
            imageError.innerHTML = '';
            imageL.classList.remove('invalid-value');
            triangleImage.classList.remove('triangleWarning');

            imageL.classList.add('valid-value');
            checkImage.classList.add('circleCheck');
        }
    });

    // Errores para input categoría
    categories.forEach(category => {
        category.addEventListener('change', function(){
            
            let categorySelected = false;
            let severalCategoriesSelected = false;
            let checkedCategories = [];
            
            for(let i = 0; i < categories.length; i++){
                if(categories[i].checked){
                    checkedCategories.push(categories[i].value);
                }
            }

            checkedCategories.forEach(checkedCategory => {
                if(checkedCategory == '1' || checkedCategory == '2' || checkedCategory == '3' || checkedCategory == '4'){
                    categorySelected = true;
                }
            });

            checkedCategories.forEach(checkedCategory => {
                if(checkedCategory == '1'){
                    for(let j = 0; j < checkedCategories.length; j++){
                        if(checkedCategories[j] == '2' || checkedCategories[j] == '3' || checkedCategories[j] == '4'){
                            severalCategoriesSelected = true;
                        }
                    }
                } else if(checkedCategory == '2'){
                    for(let j = 0; j < checkedCategories.length; j++){
                        if(checkedCategories[j] == '1' || checkedCategories[j] == '3' || checkedCategories[j] == '4'){
                            severalCategoriesSelected = true;
                        }
                    }
                } else if(checkedCategory == '3'){
                    for(let j = 0; j < checkedCategories.length; j++){
                        if(checkedCategories[j] == '1' || checkedCategories[j] == '2' || checkedCategories[j] == '4'){
                            severalCategoriesSelected = true;
                        }
                    }
                } else if(checkedCategory == '4'){
                    for(let j = 0; j < checkedCategories.length; j++){
                        if(checkedCategories[j] == '1' || checkedCategories[j] == '2' || checkedCategories[j] == '3'){
                            severalCategoriesSelected = true;
                        }
                    }
                }
            });

            if(!categorySelected){
                categoryError.innerHTML = 'Selecciona al menos una categoría principal (DC, Marvel, Independiente o Manga)';
                triangleCategory.classList.add('triangleWarning');
                checkCategory.classList.remove('circleCheck');

            } else if(severalCategoriesSelected){
                categoryError.innerHTML = 'Selecciona solo una categoría principal (DC, Marvel, Independiente o Manga)';
                triangleCategory.classList.add('triangleWarning');
                checkCategory.classList.remove('circleCheck');

            } else{
                categoryError.innerHTML = '';
                triangleCategory.classList.remove('triangleWarning');
                checkCategory.classList.add('circleCheck');
            }
        });
    });

    // Errores input autores
    author.addEventListener('blur', function(){

        if(author.value == ''){
            authorError.innerHTML = 'Ingresa el/los autores del producto';
    
            author.classList.add('invalid-value');
            triangleAuthor.classList.add('triangleWarning');
    
            author.classList.remove('valid-value');
            checkAuthor.classList.remove('circleCheck');
    
        } else{
            authorError.innerHTML = '';
            author.classList.remove('invalid-value');
            triangleAuthor.classList.remove('triangleWarning');
    
            author.classList.add('valid-value');
            checkAuthor.classList.add('circleCheck');
        }
    });

    // Errores input formato
    format.addEventListener('blur', function(){

        if(format.value != '1' && format.value != '2' && format.value != '3'){
            formatError.innerHTML = 'Selecciona el formato';
    
            format.classList.add('invalid-value');
            triangleFormat.classList.add('triangleWarning');
    
            format.classList.remove('valid-value');
            checkFormat.classList.remove('circleCheck');
    
        } else{
            formatError.innerHTML = '';
            format.classList.remove('invalid-value');
            triangleFormat.classList.remove('triangleWarning');
    
            format.classList.add('valid-value');
            checkFormat.classList.add('circleCheck');
        }
    });

    // Errores input páginas
    pages.addEventListener('blur', function(){

        if(pages.value == ''){
            pagesError.innerHTML = 'Ingresa la cantidad de páginas del producto';
    
            pages.classList.add('invalid-value');
            trianglePages.classList.add('triangleWarning');
    
            pages.classList.remove('valid-value');
            checkPages.classList.remove('circleCheck');
    
        } else{
            pagesError.innerHTML = '';
            pages.classList.remove('invalid-value');
            trianglePages.classList.remove('triangleWarning');
    
            pages.classList.add('valid-value');
            checkPages.classList.add('circleCheck');
        }
    });

    // Errores input precio
    price.addEventListener('blur', function(){

        if(price.value == ''){
            priceError.innerHTML = 'Ingresa el precio del producto (COP)';
    
            price.classList.add('invalid-value');
            trianglePrice.classList.add('triangleWarning');
    
            price.classList.remove('valid-value');
            checkPrice.classList.remove('circleCheck');
    
        } else{
            formatError.innerHTML = '';
            price.classList.remove('invalid-value');
            trianglePrice.classList.remove('triangleWarning');
    
            price.classList.add('valid-value');
            checkPrice.classList.add('circleCheck');
        }
    });

    // Errores input descuento
    discount.addEventListener('blur', function(){

        if(discount.value == ''){
            discountError.innerHTML = 'Ingresa el descuento. Recuerda: Si no está en oferta, el descuento es "0" (cero)';
    
            discount.classList.add('invalid-value');
            triangleDiscount.classList.add('triangleWarning');
    
            discount.classList.remove('valid-value');
            checkDiscount.classList.remove('circleCheck');
    
        } else if(onSale.checked && discount.value <= 0){
            discountError.innerHTML = 'Puesto que el producto está en oferta, el descuento debe ser mayor a "0" (cero)';
    
            discount.classList.add('invalid-value');
            triangleDiscount.classList.add('triangleWarning');
    
            discount.classList.remove('valid-value');
            checkDiscount.classList.remove('circleCheck');

        } else if(!onSale.checked && discount.value > 0){
            discountError.innerHTML = 'Puesto que el producto no está en oferta, el descuento debe ser igual "0" (cero)';
    
            discount.classList.add('invalid-value');
            triangleDiscount.classList.add('triangleWarning');
    
            discount.classList.remove('valid-value');
            checkDiscount.classList.remove('circleCheck');

        } else{
            discountError.innerHTML = '';
            discount.classList.remove('invalid-value');
            triangleDiscount.classList.remove('triangleWarning');
    
            discount.classList.add('valid-value');
            checkDiscount.classList.add('circleCheck');
        }
    });

    // Errores input stock
    stock.addEventListener('blur', function(){

        if(stock.value == ''){
            stockError.innerHTML = 'Ingresa cuantos productos están disponibles';
    
            stock.classList.add('invalid-value');
            triangleStock.classList.add('triangleWarning');
    
            stock.classList.remove('valid-value');
            checkStock.classList.remove('circleCheck');
    
        } else{
            stockError.innerHTML = '';
            stock.classList.remove('invalid-value');
            triangleStock.classList.remove('triangleWarning');
    
            stock.classList.add('valid-value');
            checkStock.classList.add('circleCheck');
        }
    });

    // Errores generales para evitar envío del formulario
    form.addEventListener('submit', function(e){

        //Contador errores
        let errorsAmount = 0;

        // Errores input nombre
        if(name.value == ''){
            nameError.innerHTML = 'Ingresa el nombre del producto';

            name.classList.add('invalid-value');
            triangleName.classList.add('triangleWarning');

            name.classList.remove('valid-value');
            checkName.classList.remove('circleCheck');

            errorsAmount += 1;

        } else if(name.value.length < 5){
            nameError.innerHTML = 'El nombre del producto debe tener al menos 5 caracteres';

            name.classList.add('invalid-value');
            triangleName.classList.add('triangleWarning');

            name.classList.remove('valid-value');
            checkName.classList.remove('circleCheck');

            errorsAmount += 1;
        }

        // Errores input descripción
        if(description.value == ''){
            descriptionError.innerHTML = 'Ingresa la descripción del producto';

            description.classList.add('invalid-value');
            triangleDescription.classList.add('triangleWarning');

            description.classList.remove('valid-value');
            checkDescription.classList.remove('circleCheck');
            
            errorsAmount += 1;

        } else if(description.value.length < 20){
            descriptionError.innerHTML = 'La descripción del producto debe tener al menos 20 caracteres';

            description.classList.add('invalid-value');
            triangleDescription.classList.add('triangleWarning');

            description.classList.remove('valid-value');
            checkDescription.classList.remove('circleCheck');
            
            errorsAmount += 1;
        }

        // Errores input imagen
        let fileName = image.value;
            
        let fileExtension = fileName.split('.');

        let extension = fileExtension[fileExtension.length - 1];

        let acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif', ''];

        let extensionMatch = false;

        acceptedExtensions.forEach(extensionA => {
            if(extensionA == extension){
                extensionMatch = true;
            }
        })
        
        if(!extensionMatch){
            imageError.innerHTML = 'Las extensiones de archivo permitidas son .jpg, .jpeg, .png y .gif';
            imageL.classList.add('invalid-value');
            triangleImage.classList.add('triangleWarning');

            imageL.classList.remove('valid-value');
            checkImage.classList.remove('circleCheck');

            errorsAmount += 1;
        }

        // Errores para input categoría
        categories.forEach(category => {
            let categorySelected = false;
            let severalCategoriesSelected = false;
            let checkedCategories = [];
            
            for(let i = 0; i < categories.length; i++){
                if(categories[i].checked){
                    checkedCategories.push(categories[i].value);
                }
            }

            checkedCategories.forEach(checkedCategory => {
                if(checkedCategory == '1' || checkedCategory == '2' || checkedCategory == '3' || checkedCategory == '4'){
                    categorySelected = true;
                }
            });

            checkedCategories.forEach(checkedCategory => {
                if(checkedCategory == '1'){
                    for(let j = 0; j < checkedCategories.length; j++){
                        if(checkedCategories[j] == '2' || checkedCategories[j] == '3' || checkedCategories[j] == '4'){
                            severalCategoriesSelected = true;
                        }
                    }
                } else if(checkedCategory == '2'){
                    for(let j = 0; j < checkedCategories.length; j++){
                        if(checkedCategories[j] == '1' || checkedCategories[j] == '3' || checkedCategories[j] == '4'){
                            severalCategoriesSelected = true;
                        }
                    }
                } else if(checkedCategory == '3'){
                    for(let j = 0; j < checkedCategories.length; j++){
                        if(checkedCategories[j] == '1' || checkedCategories[j] == '2' || checkedCategories[j] == '4'){
                            severalCategoriesSelected = true;
                        }
                    }
                } else if(checkedCategory == '4'){
                    for(let j = 0; j < checkedCategories.length; j++){
                        if(checkedCategories[j] == '1' || checkedCategories[j] == '2' || checkedCategories[j] == '3'){
                            severalCategoriesSelected = true;
                        }
                    }
                }
            });

            if(!categorySelected){
                categoryError.innerHTML = 'Selecciona al menos una categoría principal (DC, Marvel, Independiente o Manga)';
                triangleCategory.classList.add('triangleWarning');
                checkCategory.classList.remove('circleCheck');
                
                errorsAmount += 1;

            } else if(severalCategoriesSelected){
                categoryError.innerHTML = 'Selecciona solo una categoría principal (DC, Marvel, Independiente o Manga)';
                triangleCategory.classList.add('triangleWarning');
                checkCategory.classList.remove('circleCheck');
                
                errorsAmount += 1;
            }
        });

        // Errores input autores
        if(author.value == ''){
            authorError.innerHTML = 'Ingresa el/los autores del producto';
    
            author.classList.add('invalid-value');
            triangleAuthor.classList.add('triangleWarning');
    
            author.classList.remove('valid-value');
            checkAuthor.classList.remove('circleCheck');

            errorsAmount += 1;
        }

        // Errores input formato
        if(format.value != '1' && format.value != '2' && format.value != '3'){
            formatError.innerHTML = 'Selecciona el formato';
        
            format.classList.add('invalid-value');
            triangleFormat.classList.add('triangleWarning');
        
            format.classList.remove('valid-value');
            checkFormat.classList.remove('circleCheck');

            errorsAmount += 1;
        }

        // Errores input páginas
        if(pages.value == ''){
            pagesError.innerHTML = 'Ingresa la cantidad de páginas del producto';
    
            pages.classList.add('invalid-value');
            trianglePages.classList.add('triangleWarning');
    
            pages.classList.remove('valid-value');
            checkPages.classList.remove('circleCheck');
            
            errorsAmount += 1;    
        }

        // Errores input precio
        if(price.value == ''){
            priceError.innerHTML = 'Ingresa el precio del producto (COP)';
    
            price.classList.add('invalid-value');
            trianglePrice.classList.add('triangleWarning');
    
            price.classList.remove('valid-value');
            checkPrice.classList.remove('circleCheck');

            errorsAmount += 1;
        }

        // Errores input descuento
        if(discount.value == ''){
            discountError.innerHTML = 'Ingresa el descuento. Recuerda: Si no está en oferta, el descuento es "0" (cero)';
    
            discount.classList.add('invalid-value');
            triangleDiscount.classList.add('triangleWarning');
    
            discount.classList.remove('valid-value');
            checkDiscount.classList.remove('circleCheck');

            errorsAmount += 1;
    
        } else if(onSale.checked && discount.value <= 0){
            discountError.innerHTML = 'Puesto que el producto está en oferta, el descuento debe ser mayor a "0" (cero)';
    
            discount.classList.add('invalid-value');
            triangleDiscount.classList.add('triangleWarning');
    
            discount.classList.remove('valid-value');
            checkDiscount.classList.remove('circleCheck');

            errorsAmount += 1;

        } else if(!onSale.checked && discount.value > 0){
            discountError.innerHTML = 'Puesto que el producto no está en oferta, el descuento debe ser igual "0" (cero)';
    
            discount.classList.add('invalid-value');
            triangleDiscount.classList.add('triangleWarning');
    
            discount.classList.remove('valid-value');
            checkDiscount.classList.remove('circleCheck');

            errorsAmount += 1;
        }

        // Errores input stock
        if(stock.value == ''){
            stockError.innerHTML = 'Ingresa cuantos productos están disponibles';
    
            stock.classList.add('invalid-value');
            triangleStock.classList.add('triangleWarning');
    
            stock.classList.remove('valid-value');
            checkStock.classList.remove('circleCheck');
            
            errorsAmount += 1;    
        }

        if(errorsAmount > 0){
            e.preventDefault();
        }else{
            e.preventDefault();

            Swal.fire({
                title: '¡El producto ha sido actualizado!',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#251854',
                confirmButtonText: 'Ver producto',
  
                customClass: {
                  title:'warning__title',
                  confirmButton: 'warning__confirm',
                }
  
            }).then((result) => {
                if (result.isConfirmed) {
                    form.submit();
                }
            })
        }
    })
})