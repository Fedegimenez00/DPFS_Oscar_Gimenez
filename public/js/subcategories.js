  // Definir subcategorías para cada categoría
  const subcategorias = {
    seguridadOfensiva: ["Hacking de Aplicaciones Web", "Pentesting", "Explotación de Vulnerabilidades"],
    seguridadDefensiva: ["Fortificación de Redes", "Respuesta a Incidentes", "Análisis de Malware"],
    seguridadNube: ["Gestión de Identidades y Accesos (IAM)", "Arquitectura Segura en la Nube", "Respuesta a Incidentes en Cloud"],
    ingenieriaSocial: ["Técnicas de Ingeniería Social", "Concienciación y Educación"]
};

function actualizarSubcategorias() {
    const categoriaSeleccionada = document.getElementById("categoria").value;
    const subcategoriaSelect = document.getElementById("subcategoria");

    // Limpiar opciones anteriores
    subcategoriaSelect.innerHTML = '<option class="selectGrey" value="" selected disabled>-- Seleccionar subcategoría --</option>';

    // Si se selecciona una categoría, agregar las subcategorías correspondientes
    if (categoriaSeleccionada && subcategorias[categoriaSeleccionada]) {
        subcategorias[categoriaSeleccionada].forEach(subcat => {
            let option = document.createElement("option");
            option.value = subcat.toLowerCase();
            option.textContent = subcat;
            subcategoriaSelect.appendChild(option);
        });
    }
}