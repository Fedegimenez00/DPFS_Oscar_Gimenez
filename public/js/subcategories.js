/* // Definir subcategorías para cada categoría con las mismas etiquetas del <select>
const subcategorias = {
    "Fundamentos de la Ciberseguridad": ["Conceptos Básicos", "Buenas Prácticas", "Normativas y Legislaciones"],
    "Seguridad Ofensiva": ["Hacking de Aplicaciones Web", "Pentesting", "Explotación de Vulnerabilidades"],
    "Seguridad Defensiva": ["Fortificación de Redes", "Respuesta a Incidentes", "Análisis de Malware"],
    "Seguridad de Nube": ["Gestión de Identidades y Accesos (IAM)", "Arquitectura Segura en la Nube", "Respuesta a Incidentes en Cloud"],
    "Ingenieria Social": ["Técnicas de Ingeniería Social", "Concienciación y Educación"]
};

function actualizarSubcategorias(selectedSubcategory = null) {
    const categoriaSeleccionada = document.getElementById("category").value;
    const subcategoriaSelect = document.getElementById("subcategory");

    // Limpiar opciones anteriores
    subcategoriaSelect.innerHTML = '<option class="selectGrey" selected disabled>-- Seleccionar subcategoría --</option>';

    // Si hay subcategorías para la categoría seleccionada, agregarlas
    if (categoriaSeleccionada in subcategorias) {
        subcategorias[categoriaSeleccionada].forEach(subcat => {
            let option = document.createElement("option");
            option.value = subcat; 
            option.textContent = subcat;

            // Si es la subcategoría del producto, marcarla como seleccionada
            if (subcat === selectedSubcategory) {
                option.selected = true;
            }

            subcategoriaSelect.appendChild(option);
        });
    }
}

// Ejecutar la función cuando la página carga para seleccionar la subcategoría guardada
document.addEventListener("DOMContentLoaded", function() {
    const storedSubcategory = "<%= productEdit.subcategory %>"; // Obtener la subcategoría desde EJS
    actualizarSubcategorias(storedSubcategory); // Pasarla como argumento a la función
});

*/
async function loadCategories() {
    try {
        const response = await fetch('/database/data/categories.json');  //Ruta del JSON
        if (!response.ok) throw new Error('Error al cargar categorías');

        const categories = await response.json();
        console.log('Categorías cargadas:', categories); // Verificar en consola

        const categorySelect = document.getElementById('category');
        const subcategorySelect = document.getElementById('subcategory');

        // Limpiar selects
        categorySelect.innerHTML = '<option class="selectGrey" value="" selected disabled>-- Seleccionar categoría --</option>';
        subcategorySelect.innerHTML = '<option class="selectGrey" value="" selected disabled>-- Seleccionar subcategoría --</option>';
        subcategorySelect.disabled = true;

        // Cargar categorías en el select
        categories.forEach(category => {
            let option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });

        // Manejo del cambio de categoría
        categorySelect.addEventListener('change', function () {
            subcategorySelect.innerHTML = '<option value="" class="selectGrey" selected disabled>-- Seleccionar subcategoría --</option>';
            subcategorySelect.disabled = true;

            const selectedCategory = categories.find(cat => cat.id === this.value);
            if (selectedCategory && selectedCategory.subcategories.length > 0) {
                subcategorySelect.disabled = false;

                selectedCategory.subcategories.forEach(sub => {
                    let option = document.createElement('option');
                    option.value = sub.id;
                    option.textContent = sub.name;
                    subcategorySelect.appendChild(option);
                });
            }
        });

    } catch (error) {
        console.error('Error cargando las categorías:', error);
    }
}

// Cargar al iniciar la página
document.addEventListener('DOMContentLoaded', loadCategories);
