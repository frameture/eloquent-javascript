function flatten(arrayOfArrays) {
  return arrayOfArrays.reduce(function(a, b) {
    return a.concat(b);
  })
}

console.log(flatten([[1, 2, 3], [4, 5], [6]]), "Expect [1 - 6]");