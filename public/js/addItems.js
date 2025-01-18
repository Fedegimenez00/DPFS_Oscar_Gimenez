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


/* Dynamic example

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Configuración dinámica basada en atributos de datos.
   * Los botones y contenedores se configuran utilizando atributos específicos para mayor flexibilidad.
  
  const initializeDynamicHandlers = () => {
    const addButtons = document.querySelectorAll('[data-add-button]'); // Botones para añadir contenido
    const cancelButtons = document.querySelectorAll('[data-cancel-button]'); // Botones para cancelar
    const toggleButtons = document.querySelectorAll('[data-toggle-button]'); // Botones "+ Contenido"
    const contentMenus = document.querySelectorAll('[data-content-menu]'); // Menús de contenido
    const containers = document.querySelectorAll('[data-container]'); // Contenedores para partials

    let elementCount = 0; // Contador global para generar IDs únicos para partials

    /**
     * Manejo de botón "Añadir contenido".
     * Cada botón "Añadir" obtiene su contenedor y partial asociados a través de los atributos.
    
    addButtons.forEach(addButton => {
      const containerSelector = addButton.dataset.targetContainer;
      const container = document.querySelector(containerSelector);

      if (!container) {
        console.error(`Contenedor no encontrado para el selector: ${containerSelector}`);
        return;
      }

      addButton.addEventListener('click', async () => {
        elementCount++;
        try {
          // Obtener el partial desde el servidor
          const partialUrl = addButton.dataset.partialUrl || `/partial?id=${elementCount}`;
          const response = await fetch(partialUrl);

          if (!response.ok) throw new Error('Error al cargar el partial');
          const partialHTML = await response.text();

          // Crear y añadir el nuevo elemento
          const newElement = document.createElement('div');
          newElement.innerHTML = partialHTML;
          container.appendChild(newElement.firstElementChild);

          // Gestionar elementos dinámicos
          handleElementVisibility(addButton, true);
          attachCancelHandler(newElement, container, addButton);
        } catch (error) {
          console.error('Error al cargar el partial:', error);
        }
      });
    });

    /**
     * Manejo de botón "+ Contenido".
     * Muestra el menú de contenido y oculta otros elementos asociados.
     
    toggleButtons.forEach(toggleButton => {
      toggleButton.addEventListener('click', () => {
        const contentMenuSelector = toggleButton.dataset.targetContentMenu;
        const contentMenu = document.querySelector(contentMenuSelector);

        if (contentMenu) {
          toggleButton.classList.add('hidden');
          contentMenu.classList.remove('hidden');
        } else {
          console.error(`Menú de contenido no encontrado para el selector: ${contentMenuSelector}`);
        }
      });
    });
  };

  
   * Adjunta un manejador al botón "Cancelar" para restaurar el estado inicial.
   * 
   * @ param {HTMLElement} element - Elemento que se eliminará.
   * @ param {HTMLElement} container - Contenedor principal.
   * @ param {HTMLElement} addButton - Botón "Añadir" asociado.
   
  const attachCancelHandler = (element, container, addButton) => {
    const cancelButtonSelector = addButton.dataset.cancelButton;
    const cancelButton = document.querySelector(cancelButtonSelector);

    if (!cancelButton) {
      console.error(`Botón "Cancelar" no encontrado para el selector: ${cancelButtonSelector}`);
      return;
    }

    cancelButton.style.display = 'block'; // Mostrar botón "Cancelar"

    cancelButton.addEventListener('click', () => {
      element.remove(); // Eliminar el elemento añadido
      handleElementVisibility(addButton, false); // Restaurar visibilidad inicial
    });
  };

  
   * Gestiona la visibilidad de los botones y menús según el estado actual.
   * 
   * @ param {HTMLElement} addButton - Botón "Añadir" que activa el flujo.
   @ param {boolean} isAdding - Indica si se está añadiendo o cancelando contenido.
   
  const handleElementVisibility = (addButton, isAdding) => {
    const toggleElements = document.querySelectorAll(addButton.dataset.toggleElements);

    toggleElements.forEach(el => {
      el.style.display = isAdding ? 'none' : 'block';
    });

    const cancelButtonSelector = addButton.dataset.cancelButton;
    const cancelButton = document.querySelector(cancelButtonSelector);

    if (cancelButton) {
      cancelButton.style.display = isAdding ? 'block' : 'none';
    }
  };

  // Inicializar los manejadores dinámicos
  initializeDynamicHandlers();
});

*/
