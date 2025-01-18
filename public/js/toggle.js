function initializeToggleButtons(context = document) {
  const buttons = context.querySelectorAll('.toggle-button, .itemVideo--button');
  const contents = context.querySelectorAll('.forms--box, .itemVideo--formBox');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Deseleccionar todos los botones en el contexto
      buttons.forEach(btn => btn.classList.remove('selected'));

      // Ocultar todos los contenidos en el contexto
      contents.forEach(content => content.classList.remove('visible'));

      // Marcar el botón actual como seleccionado
      button.classList.add('selected');

      // Mostrar el contenido asociado al botón
      const targetId = button.getAttribute('data-target');
      const targetElement = context.querySelector(`#${targetId}`);
      if (targetElement) {
        targetElement.classList.add('visible');
      }
    });
  });
}

// Inicializar toggle en el documento principal
document.addEventListener('DOMContentLoaded', () => {
  initializeToggleButtons();

  // Monitorear si se añaden nuevos elementos al DOM
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('itemVideo')) {
          initializeToggleButtons(node); // Inicializar en nuevos partials
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
