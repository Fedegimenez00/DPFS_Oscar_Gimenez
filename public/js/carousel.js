const carousel = document.querySelector('.productCourses__carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let isDown = false;
let startX;
let scrollLeft;

// Función para actualizar la visibilidad de los botones de navegación
function updateButtons() {
    prevButton.classList.toggle('disabled', carousel.scrollLeft <= 0);
    nextButton.classList.toggle('disabled', carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth);
}

// Función para ajustar el tamaño de las tarjetas según la resolución de pantalla
function adjustCards() {
    const screenWidth = window.innerWidth;
    const cards = document.querySelectorAll('.course--card');
    let cardWidth;

    if (screenWidth < 600) {
        cardWidth = '225px'; // 1 tarjeta en móviles
    } else if (screenWidth < 900) {
        cardWidth = '235px'; // 2 tarjetas en tablets
    } else if (screenWidth < 1024) {
        cardWidth = '238px'; // 3 tarjetas en pantallas grandes
    } else {
        cardWidth = '325px'; // Ancho fijo en pantallas más grandes
    }

    cards.forEach(card => card.style.minWidth = cardWidth);
}

// Ajustar tarjetas al cambiar el tamaño de la ventana o al cargar la página
window.addEventListener('resize', adjustCards);
window.addEventListener('DOMContentLoaded', adjustCards);

// Evento para detectar cuando se presiona el mouse sobre el carrusel
carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.style.scrollBehavior = 'auto'; // Desactiva el scroll suave mientras se arrastra
});

// Eventos para finalizar el arrastre del mouse
carousel.addEventListener('mouseleave', () => isDown = false);
carousel.addEventListener('mouseup', () => isDown = false);

// Evento para desplazar el carrusel con el movimiento del mouse
carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX);
    carousel.scrollLeft = scrollLeft - walk;
});

// Eventos para detectar el inicio del desplazamiento táctil
carousel.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

// Evento para finalizar el desplazamiento táctil
carousel.addEventListener('touchend', () => isDown = false);

// Evento para desplazar el carrusel con el movimiento táctil
carousel.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Multiplicador para mejorar la sensibilidad del deslizamiento
    carousel.scrollLeft = scrollLeft - walk;
});

// Eventos para mover el carrusel con los botones de navegación
nextButton.addEventListener('click', () => {
    carousel.scrollBy({ left: 300, behavior: 'smooth' });
});

prevButton.addEventListener('click', () => {
    carousel.scrollBy({ left: -300, behavior: 'smooth' });
});

// Eventos para actualizar los botones de navegación según el estado del scroll
carousel.addEventListener('scroll', updateButtons);
window.addEventListener('load', updateButtons);
