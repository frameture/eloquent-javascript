topEnv["array"] = function() {
  return new Array(Array.prototype.slice.call(arguments))[0]; 
};
topEnv["length"] = function(array) { return array.length; };

topEnv["element"] = function(array, n) { return array[n]; } ;

console.log("Expect 6.");
run("do(define(sum, fun(array,", // Depends on chapter 11 files.
    "     do(define(i, 0),",
    "        define(sum, 0),",
    "        while(<(i, length(array)),",
    "          do(define(sum, +(sum, element(array, i))),",
    "             define(i, +(i, 1)))),",
    "        sum))),",
    "   print(sum(array(1, 2, 3))))");