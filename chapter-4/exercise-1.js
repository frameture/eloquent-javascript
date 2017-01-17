function range(from, to, step) { 
  if (step == undefined) step = 1;

  var array = [];
  for (var i = from; i <= to; i += step)
    array.push(i);
  return array;
}

function sum(numbers) {
  var total = 0;
  for (var i = 0; i < numbers.length; i++)
    total += numbers[i];
    return total;
}

console.log(sum(range(1, 10)), "Expect 55");