let minusButton = document.querySelectorAll('.minus');
let plusButton = document.querySelectorAll('.plus');

minusButton.forEach(button => {
    button.addEventListener('click', function(e){
        e.preventDefault();

        let idProduct = this.getAttribute('data-id');

        let numberInput = document.querySelector('.numberInput[data-id="' + idProduct + '"]');

        let counter = numberInput.value;

        if(numberInput.value > 0){
            
            numberInput.value = Number(counter) - 1;
    
            counter = numberInput.value;
        }
    });
});

plusButton.forEach(button => {
    button.addEventListener('click', function(e){
        e.preventDefault();

        let idProduct = this.getAttribute('data-id');

        let numberInput = document.querySelector('.numberInput[data-id="' + idProduct + '"]');

        let counter = numberInput.value;

        numberInput.value = Number(counter) + 1;
    
        counter = numberInput.value;
    });
});
