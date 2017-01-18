function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

function ageDifference(array) {
  function haveMother(a) { 
    return a.filter(function(p) { return byName[p.mother]; }); 
  }

  return haveMother(array).map(function(person) {
    return person.born - byName[person.mother].born;
  });
}

console.log(average(ageDifference(ancestry)), "Expect 31.2");