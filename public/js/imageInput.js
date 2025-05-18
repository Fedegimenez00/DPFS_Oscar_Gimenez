const fileInput = document.getElementById("image");
const fileNameDisplay = document.getElementById("file-name");

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    fileNameDisplay.textContent = fileInput.files[0].name;
  } else {
    fileNameDisplay.textContent = "No has seleccionado ...";
  }
});
