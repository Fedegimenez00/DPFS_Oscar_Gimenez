let editor = document.getElementById("editor");

// Aplicar estilos y actualizar el estado del botón
function applyStyle(command, button) {
    document.execCommand(command, false, null);
    editor.focus(); // Mantiene el foco después de aplicar el estilo
    updateToolbar(); // Verifica qué estilos están activos
}

// Eliminar el placeholder al hacer clic
function clearPlaceholder() {
    if (editor.classList.contains("empty")) {
        editor.innerHTML = "";
        editor.classList.remove("empty");
    }
}

// Restaurar el placeholder si está vacío
function restorePlaceholder() {
    if (editor.innerHTML.trim() === "") {
        editor.innerHTML = "Escribe aquí...";
        editor.classList.add("empty");
    }
}

// Guardar el contenido en el textarea antes de enviar
document.getElementById("textForm").addEventListener("submit", function() {
    document.getElementById("hiddenInput").value = editor.innerHTML;
});

// Actualizar el estado de los botones según el formato aplicado
function updateToolbar() {
    const commands = ["bold", "italic", "underline", "insertUnorderedList", "insertOrderedList"];
    const buttons = document.querySelectorAll(".toolbar button");

    commands.forEach((command, index) => {
        if (document.queryCommandState(command)) {
            buttons[index].classList.add("active"); // Si está aplicado, marcar botón activo
        } else {
            buttons[index].classList.remove("active"); // Si no, desmarcar
        }
    });
}

// Detectar cambios en la selección para actualizar la barra de herramientas
document.addEventListener("selectionchange", function() {
    if (document.activeElement === editor) {
        updateToolbar();
    }
});

// Corrección para eliminar listas correctamente sin volver a la lista anterior
editor.addEventListener("keydown", function(event) {
    if (event.key === "Backspace") {
        let selection = window.getSelection();
        let range = selection.getRangeAt(0);
        let currentNode = range.startContainer;

        // Si el cursor está en un <li> vacío y se presiona Backspace
        if (currentNode.nodeType === Node.ELEMENT_NODE && currentNode.tagName === "LI" && currentNode.innerText.trim() === "") {
            event.preventDefault(); // Evita la eliminación predeterminada
            let parentList = currentNode.parentNode;

            // Crea un nuevo párrafo alineado a la izquierda
            let newParagraph = document.createElement("p");
            newParagraph.innerHTML = "<br>"; // Simula un salto de línea
            parentList.parentNode.replaceChild(newParagraph, parentList);
            
            let newRange = document.createRange();
            newRange.setStart(newParagraph, 0);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
        }
    }
});
