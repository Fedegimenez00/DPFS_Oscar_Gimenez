const nav = document.querySelector('#nav');
const burgerMenu = document.querySelector('#burgerMenu');

burgerMenu.addEventListener('click', () => {
    nav.classList.toggle('visible');
})

/* burgerMenu.addEventListener('click', () => {
    nav.classList.remove('visible');
})

*/
