function reverseArray(array) {
  var newArray = [];
  for (var i = array.length - 1; i >= 0; i--)
    newArray.push(array[i]);
  return newArray; 
}

function reverseArrayInPlace(array) {
  for (var i = 0; i < array.length / 2; i++) {
    var temp = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = temp;
  }
}

array = [1, 2, 3, 4, 5];
console.log(reverseArray(array), "Expect [5, 4, 3, 2, 1]");
reverseArrayInPlace(array);
console.log(array, "Expect [5, 4, 3, 2, 1]");