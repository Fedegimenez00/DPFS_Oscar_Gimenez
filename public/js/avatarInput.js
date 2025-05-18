const fileInput = document.getElementById("avatar");
const fileNameDisplay = document.getElementById("file-name");

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    fileNameDisplay.textContent = fileInput.files[0].name;
  } else {
    fileNameDisplay.textContent = "No has subido archivos";
  }
});
