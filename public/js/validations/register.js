window.onload = () => {
  const form = document.querySelector("form");
  const errorList = document.querySelector(".errors");

  //Validación para la extensión de la imagen
  const fileInput = form.avatar;
  const acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

  form.onsubmit = (e) => {
    errorList.innerHTML = "";

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    let errors = [];
    if (validator.isEmpty(name)) {
      errors.push("Debes ingresar un nombre");
    } else if (!validator.isLength(name, { min: 5 })) {
      errors.push("El nombre de usuario debe tener al menos 5 caracteres");
    }

    if (validator.isEmpty(email)) {
      errors.push("Debes ingresar un email");
    } else if (!validator.isEmail(email)) {
      errors.push("El formato de email no es correcto");
    }

    if (validator.isEmpty(password)) {
      errors.push("Debes ingresar una contraseña");
    } else if (!validator.isLength(password, { min: 8 })) {
      errors.push("La contraseña debe tener al menos 8 caracteres");
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
    } else {
      Swal.fire({
        title: "Registro exitoso!",
        text: "Te redireccionaremos al home!",
        icon: "success",
      });
    }
  };
};
