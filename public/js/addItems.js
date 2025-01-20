document.addEventListener('DOMContentLoaded', () => {
  let elementCount = 0;
  let lastGeneratedElements = {};

  const toggleButton = document.querySelector('.content--toggleButton');
  const toggleContentButton = document.getElementById('toggleContentPlus');
  const downButtons = document.getElementById('toggleContentTab');
  const contentMenu = document.querySelector('.contentMenu');
  const contentParagraph = contentMenu.querySelector('p');
  const dataContainer = document.querySelector('.data-container');

  if (!toggleButton || !toggleContentButton || !downButtons || !contentMenu || !dataContainer) {
    console.error('Elementos requeridos no encontrados.');
    return;
  }

  const hideElements = (...elements) => elements.forEach(el => el.classList.add('hidden'));
  const showElements = (...elements) => elements.forEach(el => el.classList.remove('hidden'));

  toggleButton.addEventListener('click', () => {
    hideElements(toggleButton, downButtons);
    showElements(toggleContentButton, contentMenu, contentParagraph);
  });

  toggleContentButton.addEventListener('click', () => {
    hideElements(toggleContentButton, contentMenu);
    showElements(toggleButton, downButtons);
  });

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

          container.appendChild(newElement);
          lastGeneratedElements[partialType] = newElement;

          hideElements(toggleContentButton, contentMenu);
          showElements(cancelButton);

          initializePartialHandlers(newElement, cancelButton);

          cancelButton.addEventListener('click', () => {
            // Caso de generación de partial dinámico
            newElement.remove();
            hideElements(cancelButton);
            showElements(toggleContentButton, contentMenu);
          });
        } catch (error) {
          console.error('Error al cargar el partial:', error);
        }
      });
    });
  };

  const initializePartialHandlers = (partialElement, cancelButton) => {
    const saveButton = partialElement.querySelector('.save-button');
    const editButton = partialElement.querySelector('.edit-button');
    const deleteButton = partialElement.querySelector('.delete-button');
    const form = partialElement.querySelector('.dynamicForm--box');
    const previewBox = partialElement.querySelector('.contentPreview--box');
    const titleInput = partialElement.querySelector('input[type="text"]');
    const previewTitle = previewBox.querySelector('.contentPreview');
  
    if (!saveButton || !editButton || !deleteButton || !form || !previewBox || !titleInput || !previewTitle) {
      console.error('Elementos internos del partial no encontrados.');
      return;
    }
  
    // Guardar cambios
    saveButton.addEventListener('click', () => {
      const titleValue = titleInput.value.trim();
      if (titleValue) {
        previewTitle.textContent = titleValue;
        previewBox.classList.add('visible');
        form.classList.remove('visible');
  
        // Restaurar botones "+ Descripción", "+ Recursos" y "+ Contenido"
        showElements(toggleButton, downButtons);
        hideElements(cancelButton);

        partialElement.classList.remove('editing'); // Remover estado de edición
      } else {
        alert('El título no puede estar vacío.');
      }
    });
  
    // Editar contenido
    editButton.addEventListener('click', () => {
      previewBox.classList.remove('visible'); // Ocultar la previsualización
      form.classList.add('visible'); // Mostrar el formulario
  
      // Ocultar botones "+ Descripción", "+ Recursos" y "+ Contenido"
      hideElements(toggleButton, downButtons);
  
      

      partialElement.classList.add('editing'); // Marcar como edición
  
      // Cancelar la edición: Comportamiento específico
      const cancelEditHandler = () => {
        form.classList.remove('visible'); // Ocultar formulario
        previewBox.classList.add('visible'); // Mostrar previsualización
        hideElements(cancelButton); // Ocultar el botón cancel-button
  
        // Restaurar los botones "+ Descripción", "+ Recursos" y "+ Contenido"
        showElements(toggleButton, downButtons);

        partialElement.classList.remove('editing'); // Remover estado de edición
  
        // Elimina el evento después de ejecutarlo para evitar duplicados
        cancelButton.removeEventListener('click', cancelEditHandler);
      };
  
      cancelButton.addEventListener('click', cancelEditHandler);
    });
  
    // Eliminar contenido
    deleteButton.addEventListener('click', () => {
      partialElement.remove(); // Eliminar el partial del DOM
      hideElements(cancelButton);
  
      // Restaurar botones "+ Descripción", "+ Recursos" y "+ Contenido"
      showElements(toggleButton, downButtons);
    });
  };

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

          container.appendChild(newElement);
          lastGeneratedElements[partialType] = newElement;

          hideElements(toggleButton, downButtons);
          showElements(cancelButton);

          initializePartialHandlers(newElement, cancelButton);

          cancelButton.addEventListener('click', () => {
            // Caso de generación de partial dinámico
            if (!newElement.classList.contains('editing')) {
              newElement.remove();
              hideElements(cancelButton);
              showElements(toggleButton, downButtons);
            }
          });
        } catch (error) {
          console.error('Error al cargar el partial:', error);
        }
      });
    });
  };

  initializeContentMenuHandlers();
  initializeDownButtonsHandlers();
});
