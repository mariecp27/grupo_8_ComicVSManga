const menuToggle = document.querySelector('.header__menu');
const navBar = document.querySelector('.header__nav-mobile');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('cross');
    navBar.classList.toggle('active');
});

const subMenuBtn = document.querySelectorAll('.header__nav-inner-btn');
const arrow = document.querySelector('.fa-angle-right');

subMenuBtn.forEach(subMenu => {
    subMenu.addEventListener('click', function(){
        if(window.innerWidth < 769){
            const subMenu = this.nextElementSibling;
            const height = subMenu.scrollHeight;

            if(subMenu.classList.contains('show')){
                subMenu.classList.remove('show');
                subMenu.removeAttribute('style');
                arrow.classList.remove('down');
            }else{
                subMenu.classList.add('show');
                subMenu.style.height = height + 'px';
                arrow.classList.add('down');
            }
        }
    });
});