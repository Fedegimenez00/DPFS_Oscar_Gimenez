document.addEventListener('DOMContentLoaded', () => {
  let elementCount = 0; // Contador para IDs únicos
  let lastGeneratedElements = {}; // Objeto para almacenar referencias a partials por tipo

  // Selección de elementos del DOM
  const toggleButton = document.querySelector('.content--toggleButton'); // Botón "+ Contenido"
  const toggleContentButton = document.getElementById('toggleContentPlus'); // Botón "Seleccionar el tipo de contenido X"
  const downButtons = document.getElementById('toggleContentTab'); // Botones "+ Descripción" y "+ Recursos"
  const contentMenu = document.querySelector('.contentMenu'); // Menú de selección de tipo de contenido
  const contentParagraph = contentMenu.querySelector('p'); // Texto <p>
  const dataContainer = document.querySelector('.data-container'); // Contenedor de partials

  if (!toggleButton || !toggleContentButton || !downButtons || !contentMenu || !dataContainer) {
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

  // Manejo de botones del menú de "+ Contenido"
  const initializeContentMenuHandlers = () => {
    const addButtons = document.querySelectorAll('.contentMenu--buttons .data-add-button');

    addButtons.forEach(addButton => {
      addButton.addEventListener('click', async () => {
        elementCount++;
        const containerSelector = addButton.dataset.targetContainer;
        const container = document.querySelector(containerSelector);
        const partialType = addButton.dataset.partialType;
        const cancelButtonSelector = addButton.dataset.cancelButton;

        if (!container || !partialType || !cancelButtonSelector) {
          console.error('Datos del botón no válidos.');
          return;
        }

        const cancelButton = document.querySelector(cancelButtonSelector);

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
          lastGeneratedElements[partialType] = newElement; // Asignar al objeto

          // Ocultar el menú principal y mostrar el botón de cancelación correspondiente
          hideElements(toggleContentButton, contentMenu);
          showElements(cancelButton);

          // Evento de cancelación dinámico
          cancelButton.addEventListener('click', () => {
            newElement.remove(); // Elimina el partial generado
            hideElements(cancelButton); // Oculta el botón de cancelación
            showElements(toggleContentButton, contentMenu); // Regresa al menú de selección
          });
        } catch (error) {
          console.error('Error al cargar el partial:', error);
        }
      });
    });
  };

  // Manejo de botones "+ Descripción" y "+ Recursos"
  const initializeDownButtonsHandlers = () => {
    const downButtonsAdd = downButtons.querySelectorAll('.data-add-button');

    downButtonsAdd.forEach(addButton => {
      addButton.addEventListener('click', async () => {
        elementCount++;
        const containerSelector = addButton.dataset.targetContainer;
        const container = document.querySelector(containerSelector);
        const partialType = addButton.dataset.partialType;
        const cancelButtonSelector = addButton.dataset.cancelButton;

        if (!container || !partialType || !cancelButtonSelector) {
          console.error('Datos del botón no válidos.');
          return;
        }

        const cancelButton = document.querySelector(cancelButtonSelector);

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
          lastGeneratedElements[partialType] = newElement; // Asignar al objeto

          // Ocultar "+ Contenido" y el menú "+ Descripción / + Recursos"
          hideElements(toggleButton, downButtons);
          showElements(cancelButton);

          // Evento de cancelación dinámico
          cancelButton.addEventListener('click', () => {
            newElement.remove(); // Elimina el partial generado
            hideElements(cancelButton); // Oculta el botón de cancelación
            showElements(toggleButton, downButtons); // Regresa al menú inicial
          });
        } catch (error) {
          console.error('Error al cargar el partial:', error);
        }
      });
    });
  };

  initializeContentMenuHandlers(); // Inicializar manejadores del menú "+ Contenido"
  initializeDownButtonsHandlers(); // Inicializar manejadores del menú "+ Descripción / + Recursos"
});
