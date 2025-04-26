window.onload = () => {
    const form = document.querySelector('form')
    const errorList = document.querySelector('.errors');

    form.onsubmit = (e) => { //Al apretar el botón de submit, se produce un evento
       errorList.innerHTML = '' //Limpia la página cada vez que se produce otro submit
     const name = form.name.value.trim();
     const password = form.password.value.trim(); //El trim.() elimina los espacios vacíos laterales de la cadena

     let errors = [];

     //Validación de nombre de usuario
     if (validator.isEmpty(name)) {
        errors.push('Ingrese un nombre de usuario')
     }
     
     //Validación de contraseña
     if (validator.isEmpty(password)) {
        errors.push('Ingrese una contraseña')
     } else if (!validator.isLength(password, {min: 5})){
        errors.push('La contraseña debe tener al menos 5 carácteres ')
     }
     

     console.log(errors);
     
     //Previene que se actualice el error y devuelve los errores al loguearse
     if (errors.length > 0) {
        e.preventDefault(); //Detiene que se vaya la página cuando surja el evento
        errorList.classList.add('display-error')
        errors.forEach((err) => {
           errorList.innerHTML += `<li> ${err} </li>`
        })
       
     }
    }
};

