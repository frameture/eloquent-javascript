var output = document.querySelector("#output");
document.querySelector("#button").addEventListener("click", function() {
  var code = document.querySelector("#code").value;
  try {
    var value = new Function(code);
    output.innerHTML = value();
  } catch (error) {
    output.innerHTML = error.toString();
  }
});