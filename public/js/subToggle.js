 const toggleButton = document.querySelector('.content--toggleButton'); // "+ Contenido"
const contentButton = document.getElementById('toggleContentPlus'); // "Seleccionar el tipo de contenido X"
const itemVideoButton = document.getElementById('toggleitemVideoPlus'); // "Ay lmao tab video Item"
const downButtons = document.getElementById('toggleContentTab'); // Botones secundarios
const contentMenu = document.querySelector('.contentMenu'); // Content Menu

// Evento para mostrar el Content Menu y ocultar los botones iniciales
toggleButton.addEventListener('click', () => {
  toggleButton.classList.add('hidden'); // Oculta "+ Contenido"
  downButtons.classList.add('hidden'); // Oculta botones secundarios
  contentButton.classList.remove('hidden'); // Muestra "Seleccionar el tipo de contenido X"
  contentMenu.classList.remove('hidden'); // Muestra Content Menu
});

// Evento para volver al estado inicial
contentButton.addEventListener('click', () => {
  contentButton.classList.add('hidden'); // Oculta "Seleccionar el tipo de contenido X"
  contentMenu.classList.add('hidden'); // Oculta Content Menu
  toggleButton.classList.remove('hidden'); // Muestra "+ Contenido"
  downButtons.classList.remove('hidden'); // Muestra botones secundarios
});




