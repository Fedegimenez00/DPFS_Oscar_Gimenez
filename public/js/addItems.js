document.addEventListener('DOMContentLoaded', () => {
  let elementCount = 0; // Contador para IDs únicos
  let lastGeneratedElement = null; // Referencia al último partial generado

  // Selección de elementos del DOM
  const toggleButton = document.querySelector('.content--toggleButton'); // Botón "+ Contenido"
  const toggleContentButton = document.getElementById('toggleContentPlus'); // Botón "Seleccionar el tipo de contenido X"
  const downButtons = document.getElementById('toggleContentTab'); // Botones "+ Descripción" y "+ Recursos"
  const contentMenu = document.querySelector('.contentMenu'); // Menú de selección de tipo de contenido
  const contentMenuButtons = document.querySelector('.contentMenu--buttons'); // Botones Video, Diapositivas, Artículo
  const cancelButton = document.querySelector('#cancelVideoElementButton'); // Botón "Añadir Video X"
  const dataContainer = document.querySelector('.data-container'); // Contenedor de partials
  const contentParagraph = contentMenu.querySelector('p'); // Texto <p>

  if (
    !toggleButton ||
    !toggleContentButton ||
    !downButtons ||
    !contentMenu ||
    !contentMenuButtons ||
    !cancelButton
  ) {
    console.error('Elementos requeridos no encontrados.');
    return;
  }

  // Función para ocultar elementos
  const hideElements = (...elements) => elements.forEach(el => el.classList.add('hidden'));
  // Función para mostrar elementos
  const showElements = (...elements) => elements.forEach(el => el.classList.remove('hidden'));

  // Mostrar el menú Content Menu y ocultar los botones iniciales
  toggleButton.addEventListener('click', () => {
    hideElements(toggleButton, downButtons); // Oculta "+ Contenido" y botones secundarios
    showElements(toggleContentButton, contentMenu, contentParagraph); // Muestra "Seleccionar tipo de contenido X", Content Menu y <p>
  });

  // Volver al estado inicial desde "Seleccionar tipo de contenido X"
  toggleContentButton.addEventListener('click', () => {
    hideElements(toggleContentButton, contentMenu); // Oculta "Seleccionar tipo de contenido X" y Content Menu
    showElements(toggleButton, downButtons); // Muestra "+ Contenido" y botones secundarios
  });

  // Función para inicializar manejadores dinámicos
  const initializeDynamicHandlers = () => {
    const addButtons = document.querySelectorAll('.data-add-button');

    // Evento del botón "Añadir Video X"
    cancelButton.addEventListener('click', () => {
      if (lastGeneratedElement) {
        lastGeneratedElement.remove(); // Elimina el último partial generado
        lastGeneratedElement = null; // Limpia referencia
      }
      hideElements(cancelButton, contentMenu); // Oculta "Añadir Video X" y el menú de contenido
      showElements(toggleContentButton, contentMenu); // Muestra el menú con "Seleccionar tipo de contenido X" y botones
    });

    // Manejo de los botones de contenido (Video, Diapositiva, Artículo)
    addButtons.forEach(addButton => {
      addButton.addEventListener('click', async () => {
        elementCount++;
        const containerSelector = addButton.dataset.targetContainer;
        const container = document.querySelector(containerSelector);

        if (!container) {
          console.error(`Contenedor no encontrado: ${containerSelector}`);
          return;
        }

        const partialType = addButton.dataset.partialType;

        try {
          const partialUrl = `/partial?type=${partialType}&id=${elementCount}`;
          const response = await fetch(partialUrl);

          if (!response.ok) throw new Error('Error al cargar el partial');

          const partialHTML = await response.text();
          const newElement = document.createElement('div');
          newElement.classList.add('dynamic-partial');
          newElement.innerHTML = partialHTML;

          // Agregar el partial al contenedor
          container.appendChild(newElement);

          // Actualizar referencia al último elemento generado
          lastGeneratedElement = newElement;

          // Ocultar el menú principal y mostrar el botón "Añadir Video X"
          hideElements(toggleContentButton, contentMenu);
          showElements(cancelButton);
        } catch (error) {
          console.error('Error al cargar el partial:', error);
        }
      });
    });
  };

  initializeDynamicHandlers(); // Inicializar manejadores dinámicos
});
