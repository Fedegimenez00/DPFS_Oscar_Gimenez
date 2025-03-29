const nav = document.querySelector('#nav');
const burgerMenu = document.querySelector('#burgerMenu');
const userButton = document.querySelector('#userButton'); // Botón que va hacia el menú de usuario
const userMenu = document.querySelector('#userMenu'); // Menú de usuario
const returnMenuButton = document.querySelector('#returnMenuButton'); // Botón que devuelve al menú original
const navMenu = document.querySelector('#header--navbar__hub'); //Menu original de Inicio, Cursos, etc.


// Alternar visibilidad del menú principal
burgerMenu.addEventListener('click', () => {
    nav.classList.toggle('visible');
});

// Ocultar el menú principal y mostrar el menú de usuario
userButton.addEventListener('click', () => {
    userMenu.classList.add('visible');
    navMenu.classList.add('hidden');

    
});

// Ocultar el menú de usuario y volver al menú principal
returnMenuButton.addEventListener('click', () => {
    userMenu.classList.remove('visible');
    navMenu.classList.remove('hidden');
});

/* burgerMenu.addEventListener('click', () => {
    nav.classList.remove('visible');
})

*/
