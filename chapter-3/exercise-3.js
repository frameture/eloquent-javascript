function countBs(string) {
  var counter = 0;
  for (var i = 0; i < string.length; i++)
    if (string.charAt(i) == "B")
      counter++;
  return counter;
}

function countChar(string, char) {
  var counter = 0;
  for (var i = 0; i < string.length; i++)
    if (string.charAt(i) == char)
      counter++;
  return counter;
}

console.log(countBs("BooboboB"), "Expect 2");
console.log(countChar("BooboboB", "o"), "Expect 4");