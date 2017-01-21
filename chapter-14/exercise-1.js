var field = document.querySelector("input");
field.addEventListener("keypress", function(event) {
var keyTyped = String.fromCharCode(event.charCode);
  console.log(keyTyped);
  if (/[QWX]/i.test(keyTyped))
    event.preventDefault();
});