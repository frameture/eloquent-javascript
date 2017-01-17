function deepEqual(a, b) {
  if (a === b) 
    return true;
  if ( (typeof a != "object" || a == null) || 
       (typeof b != "object" || b == null) )
    return false;

  var propsA = 0;
  for (prop in a)
    propsA++;

  var propsB = 0;
  for (prop in b) {
    propsB++;
    if ( !(prop in a) || !deepEqual(a[prop], b[prop])) 
      return false;
  }
  return propsA === propsB;
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj), "Expect true");
console.log(deepEqual(obj, {here: 1, object: 2}), "Expect false");
console.log(deepEqual({here: 1, object: 2}, {here: 1, object: 2}), "Expect true");
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}), "Expect true");