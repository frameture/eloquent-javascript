function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

function century(array, century) {
  function test(person) { return Math.ceil(person.died / 100) == century; }

  return array.filter(test).map(function(person) { 
    return person.died - person.born; 
  });
}

[16, 17, 18, 19, 20, 21].forEach(function(entry) {
  console.log(entry + ": ", average(century(ancestry, entry)))
});

console.log("Expect 16: 43.5 17 51.2 18: 52.8 19: 54.8 20: 84.7 21: 94");