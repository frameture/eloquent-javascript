
var terms = [];
var div = document.getElementById("suggestions");

for (var name in window)
  terms.push(name);

var field = document.querySelector("#field");
field.addEventListener("input", function() {
  removeSuggestions();
  if (field.value.length > 0)
    findSuggestions(field.value);
});

function findSuggestions(text) {
  terms.forEach(function(word) {
    if (word.startsWith(text.toLowerCase()))
      addSuggestion(word); 
  });
}

function addSuggestion(word) {
  var p = document.createElement("p");
  p.innerHTML = word;
  p.addEventListener("click", function() {
    field.value = word;
    removeSuggestions();
  })
  div.appendChild(p);
}

function removeSuggestions() {
  for (var i = div.children.length - 1; i >= 0; i--)
    div.children[i].remove();
}