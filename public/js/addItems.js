document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('addVideoElementButton');
  const cancelButton = document.getElementById('cancelVideoElementButton'); // El botón de "Cancelar"
  const selectButton = document.getElementById('toggleContentPlus'); // El botón "Seleccionar el tipo de contenido X"
  const container = document.getElementById('videoFormContainer');
  const elementsToHide = document.querySelectorAll('.contentMenu--buttons > div'); // Elementos a ocultar
  const toggleButton = document.querySelector('.content--toggleButton'); // "+ Contenido"
  const downButtons = document.getElementById('toggleContentTab'); // Botones secundarios
  const contentMenu = document.querySelector('.contentMenu'); // Content Menu
  const contentDescription = contentMenu.querySelector('p'); // Párrafo que deseas ocultar
  let elementCount = 0;

  // Inicialmente, ocultamos el botón "Cancelar"
  cancelButton.style.display = 'none';

  // Funcionalidad para el botón de "Añadir Video"
  addButton.addEventListener('click', async () => {
    elementCount++;

    try {
      const response = await fetch(`/partial?id=${elementCount}`);
      if (!response.ok) throw new Error('Error al cargar el partial');

      const partialHTML = await response.text();

      // Crear un elemento div para insertar el HTML
      const newElement = document.createElement('div');
      newElement.innerHTML = partialHTML;

      // Ocultar los elementos previos
      elementsToHide.forEach(el => el.style.display = 'none');
      contentDescription.style.display = 'none'; // Oculta el párrafo


      // Mostrar el botón "Cancelar"
      cancelButton.style.display = 'block';

      // Ocultar el botón "Seleccionar el tipo de contenido X"
      selectButton.style.display = 'none';

      // Agregar el contenido del partial al contenedor
      container.appendChild(newElement.firstElementChild);

      // Añadir funcionalidad al botón "Cancelar"
      cancelButton.addEventListener('click', () => {
        // Eliminar el partial
        newElement.remove();

        // Restaurar los elementos ocultos
        elementsToHide.forEach(el => el.style.display = '');

        // Mostrar de nuevo el botón "Seleccionar el tipo de contenido X"
        selectButton.style.display = 'block';

        // Ocultar el botón "Cancelar"
        cancelButton.style.display = 'none';
      });

    } catch (error) {
      console.error('Error al cargar el partial:', error);
    }
  });

  // Manejo de la funcionalidad del botón "+ Contenido"
  toggleButton.addEventListener('click', () => {
    // Ocultar los elementos relacionados con el contenido
    toggleButton.classList.add('hidden'); // Oculta "+ Contenido"
    downButtons.classList.add('hidden'); // Oculta botones secundarios
    contentMenu.classList.remove('hidden'); // Muestra Content Menu
    selectButton.style.display = 'block'; // Muestra el botón "Seleccionar el tipo de contenido X"
  });

  // Funcionalidad para el botón de "Seleccionar el tipo de contenido X"
  selectButton.addEventListener('click', () => {
    // Solo ocultamos el botón "Seleccionar el tipo de contenido X" cuando se hace clic en él
    selectButton.style.display = 'none';
  });

  // Funcionalidad para el botón de "Cancelar"
  cancelButton.addEventListener('click', () => {
    // Eliminar el contenido parcial
    container.innerHTML = ''; // Eliminar el contenido del contenedor
    elementsToHide.forEach(el => el.style.display = ''); // Restaurar los elementos ocultos
    cancelButton.style.display = 'none'; // Ocultar el botón de cancelar

    // Mostrar nuevamente el botón "Seleccionar el tipo de contenido X"
    selectButton.style.display = 'block';

    // Restaurar el párrafo oculto
    contentDescription.style.display = 'block';
  });
});
