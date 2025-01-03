var coll = document.querySelectorAll(".productDetail__collapsible, .productDetail__requirementCollapsible");

for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    // Obtener el ID del contenedor objetivo
    var targetId = this.getAttribute("data-target");
    var content = document.getElementById(targetId);

    // Alternar la visibilidad del contenido
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }

    // Alternar la clase activa del botón
    this.classList.toggle("active");
  });
}