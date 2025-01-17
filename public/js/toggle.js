const buttons = document.querySelectorAll('.toggle-button');
const contents = document.querySelectorAll('.forms--box');

// Función para manejar el clic en los botones
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Deseleccionar todos los botones
    buttons.forEach(btn => btn.classList.remove('selected'));

    // Ocultar todos los contenidos
    contents.forEach(content => content.classList.remove('visible'));

    // Marcar el botón actual como seleccionado
    button.classList.add('selected');

    // Mostrar el contenido asociado al botón
    const targetId = button.getAttribute('data-target');
    document.getElementById(targetId).classList.add('visible');
  });
});
