function arrayToList(array) {
  var list = null;
  for (var i = array.length - 1; i >= 0; i--)
    list = { value: array[i], rest: list };
  return list;
}

function listToArray(list) {
  var array = [];
  var runner = list;
  do {
    array.push(runner.value);
    runner = runner.rest;
  } while (runner != null);

  return array;
}

function prepend(value, list) {
  return { value: value, list: list }; 
}

function nth(n, list) {
  if (n == 0)
    return list.value;
  if (list.value == undefined)
    return;

    return nth(n - 1, list.rest);
}
var array = [1, 2, 3, 4, 5];
var list = { value: 6, rest: { value: 7, rest: null } };
console.log(arrayToList(array), "Expect list from 1 to 5" );
console.log(listToArray(list), "Expect array from 6 to 7");
console.log(nth(1, list), "Expect 7");