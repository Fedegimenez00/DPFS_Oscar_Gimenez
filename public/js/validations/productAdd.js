window.onload = () => {
  const form = document.querySelector("form");
  const errorList = document.querySelector(".errors");

  //Validación para la extensión de la imagen
  const fileInput = form.image;
  const acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

  form.onsubmit = (e) => {
    errorList.innerHTML = "";

    const title = form.title.value.trim();
    const subtitle = form.subtitle.value.trim();
    const description = form.description.value.trim();
    const language = form.language.value.trim();
    const category = form.category.value.trim();
    const price = form.price.value.trim();

    let errors = [];

    if (validator.isEmpty(title)) {
      errors.push("Ingrese un título");
    } else if (!validator.isLength(title, { min: 5, max: 45 })) {
      errors.push("El título debe tener entre 5 y 45 caracteres");
    }

    if (validator.isEmpty(subtitle)) {
      errors.push("Ingrese un subtítulo");
    } else if (!validator.isLength(subtitle, { min: 5, max: 55 })) {
      errors.push("El subtítulo debe tener entre 5 y 55 caracteres");
    }

    if (validator.isEmpty(description)) {
      errors.push("Ingrese una descripción");
    } else if (!validator.isLength(description, { min: 20, max: 280 })) {
      errors.push("La descripción debe tener entre 20 y 280 caracteres");
    }

    if (validator.isEmpty(language)) {
      errors.push("Debes seleccionar un idioma");
    } else if (!validator.isInt(language)) {
      errors.push("El idioma seleccionado no es válido");
    }
    if (validator.isEmpty(category)) {
      errors.push("Debes seleccionar una categoría");
    } else if (!validator.isInt(category)) {
      errors.push("La categoría seleccionada no es válida");
    }

    if (!validator.isFloat(price, { min: 0 })) {
      errors.push("Debes ingresar un número válido para el precio");
    } else if (!validator.isFloat(price, { max: 9999 })) {
      errors.push("El precio no debe exceder los 5 digitos");
    }

    //Validor para la extensión de la imagen
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      const extension = fileName
        .substring(fileName.lastIndexOf("."))
        .toLowerCase();

      if (!acceptedExtensions.includes(extension)) {
        errors.push(
          `Los formatos de imagen permitidos son: ${acceptedExtensions.join(
            ", "
          )}`
        );
      }
    }

    if (errors.length > 0) {
      e.preventDefault();
      errorList.classList.add("display-error");
      errors.forEach((err) => {
        errorList.innerHTML += `<li>${err}</li>`;
      });
    }
  };
};
