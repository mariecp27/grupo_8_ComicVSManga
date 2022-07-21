window.addEventListener('load', function(){
    let deleteButton = document.querySelector('.deleteButton');
    let deleteForm =  document.querySelector('.delete-button');

    deleteButton.addEventListener('click', function(e){
        e.preventDefault();
        
        Swal.fire({
          title: '¿Deseas eliminar este producto?',
          html: '<p class="warning__text">Este proceso no se puede revertir</p>',
          icon: 'warning',
          padding: '1rem',
          backdrop: true,
          position: 'center',
          allowOutsideClick: true,
          allowEscapeKey: true,
          allowEnterKey: true,
          stopKeydownPropagation: false,
          showCancelButton: true,
          confirmButtonColor: '#251854',
          cancelButtonColor: '#F11E77',
          confirmButtonText: 'Eliminar',

          customClass: {
            popup: 'warning__popup',
            title:'warning__title',
            confirmButton: 'warning__confirm',
            cancelButton: 'warning__cancel'
          }

        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: '¡Eliminado!',
              html: '<p class="warning__text">El producto ha sido eliminado</p>',
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#251854',
              confirmButtonText: '¡Vale!',

              customClass: {
                title:'warning__title',
                confirmButton: 'warning__confirm',
              }

            }).then((result) => {
              if (result.isConfirmed) {
                deleteForm.submit();
              }
            })
          }
        })
    })
})