document.addEventListener('DOMContentLoaded', () => {
  let elementCount = 0;
  let lastGeneratedElements = {};
  let generatedPartials = {}; // Objeto para rastrear los partials activos

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

  const restorePreviewBoxes = () => {
    document.querySelectorAll('.contentPreview--box').forEach(box => {
      box.classList.add('visible');
    });
  };

  const handleButtonVisibility = (partialType, addButton) => {
    // Oculta o muestra el botón según si hay partials activos de ese tipo
    if (generatedPartials[partialType] && generatedPartials[partialType].length > 0) {
      hideElements(addButton);
    } else {
      showElements(addButton);
    }
  };

  toggleButton.addEventListener('click', () => {
    hideElements(toggleButton, downButtons);
    showElements(toggleContentButton, contentMenu, contentParagraph);

    // Ocultar todos los contentPreview--box
    document.querySelectorAll('.contentPreview--box').forEach(box => {
      box.classList.remove('visible');
    });
  });

  toggleContentButton.addEventListener('click', () => {
    hideElements(toggleContentButton, contentMenu);
    showElements(toggleButton, downButtons);

    // Restaurar todos los contentPreview--box
    restorePreviewBoxes();
  });

  const initializeContentMenuHandlers = () => {
    const addButtons = document.querySelectorAll('.contentMenu--buttons .data-add-button');

    addButtons.forEach(addButton => {
      const partialType = addButton.dataset.partialType;

      if (!generatedPartials[partialType]) {
        generatedPartials[partialType] = [];
      }

      handleButtonVisibility(partialType, addButton);

      addButton.addEventListener('click', async () => {
        elementCount++;
        const containerSelector = addButton.dataset.targetContainer;
        const container = document.querySelector(containerSelector);
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
          generatedPartials[partialType].push(newElement);

          hideElements(toggleContentButton, contentMenu, addButton);

          // Ocultar todos los contentPreview--box
          document.querySelectorAll('.contentPreview--box').forEach(box => {
            box.classList.remove('visible');
          });

          if (partialType !== "itemResources") {
            showElements(cancelButton);
          }

          initializePartialHandlers(newElement, cancelButton, partialType, addButton);

          cancelButton.addEventListener('click', () => {
            if (!newElement.classList.contains('editing')) {
              newElement.remove();
              const index = generatedPartials[partialType].indexOf(newElement);
              if (index > -1) {
                generatedPartials[partialType].splice(index, 1);
              }
              handleButtonVisibility(partialType, addButton);
              hideElements(cancelButton);
              showElements(toggleContentButton, contentMenu);
            }
          });
        } catch (error) {
          console.error('Error al cargar el partial:', error);
        }
      });
    });
  };

  const initializePartialHandlers = (partialElement, cancelButton, partialType, addButton) => {
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

    saveButton.addEventListener('click', () => {
      const titleValue = titleInput.value.trim();
      if (titleValue) {
        previewTitle.textContent = titleValue;
        previewBox.classList.add('visible');
        form.classList.remove('visible');

        showElements(toggleButton, downButtons);
        hideElements(cancelButton);

        partialElement.classList.remove('editing');

        restorePreviewBoxes();
      } else {
        alert('El título no puede estar vacío.');
      }
    });

    editButton.addEventListener('click', () => {
      previewBox.classList.remove('visible');
      form.classList.add('visible');

      document.querySelectorAll('.contentPreview--box').forEach(box => {
        box.classList.remove('visible');
      });

      hideElements(toggleButton, downButtons);

      partialElement.classList.add('editing');
    });

    deleteButton.addEventListener('click', () => {
      partialElement.remove();

      const index = generatedPartials[partialType].indexOf(partialElement);
      if (index > -1) {
        generatedPartials[partialType].splice(index, 1);
      }

      hideElements(cancelButton);
      handleButtonVisibility(partialType, addButton);

      showElements(toggleButton, downButtons);
    });
  };

  const initializeDownButtonsHandlers = () => {
    const downButtonsAdd = downButtons.querySelectorAll('.data-add-button');

    downButtonsAdd.forEach(addButton => {
      const partialType = addButton.dataset.partialType;

      if (!generatedPartials[partialType]) {
        generatedPartials[partialType] = [];
      }

      handleButtonVisibility(partialType, addButton);

      addButton.addEventListener('click', async () => {
        elementCount++;
        const containerSelector = addButton.dataset.targetContainer;
        const container = document.querySelector(containerSelector);
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
          generatedPartials[partialType].push(newElement);

          hideElements(toggleButton, downButtons, addButton);

          document.querySelectorAll('.contentPreview--box').forEach(box => {
            box.classList.remove('visible');
          });

          if (partialType !== "itemResources") {
            showElements(cancelButton);
          }

          initializePartialHandlers(newElement, cancelButton, partialType, addButton);

          cancelButton.addEventListener('click', () => {
            if (!newElement.classList.contains('editing')) {
              newElement.remove();
              const index = generatedPartials[partialType].indexOf(newElement);
              if (index > -1) {
                generatedPartials[partialType].splice(index, 1);
              }
              handleButtonVisibility(partialType, addButton);
              hideElements(cancelButton);
              showElements(toggleButton, downButtons);

              restorePreviewBoxes();
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

