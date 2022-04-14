const menuToggle = document.querySelector('.header__menu');
const navBar = document.querySelector('.header__nav-mobile');
const links = document.querySelectorAll('.header__nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('cross');
    navBar.classList.toggle('active');

    links.forEach(link => link.classList.toggle('activeLink'));
});