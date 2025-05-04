document.addEventListener('DOMContentLoaded', function () {
  const categorySelect = document.getElementById('category');
  const subcategorySelect = document.getElementById('subcategory');
  const allSubcategoryOptions = Array.from(subcategorySelect.options).slice(1); // ignora el primero

  categorySelect.addEventListener('change', function () {
    const selectedCategoryId = this.value;

    // Reinicia la selección de subcategoría
    subcategorySelect.selectedIndex = 0;

    // Muestra solo subcategorías con la categoría seleccionada
    allSubcategoryOptions.forEach(option => {
      const matchesCategory = option.getAttribute('data-category-id') === selectedCategoryId;
      option.style.display = matchesCategory ? 'block' : 'none';
    });
  });

  // Al cargar, oculta todas las subcategorías excepto la opción por defecto
  allSubcategoryOptions.forEach(option => option.style.display = 'none');
});

