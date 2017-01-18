function Iterator() {
  this.args = arguments;
  this.count = 0;
  this.max = this.args.length;
  
  this.iterate = function(times) {
    for (var i = 0; i < times; i++) {
      if (this.count == this.max)
        return;
      console.log(this.args[this.count]);
      this.count++;
    };
  }
}

function logFive(iterator) {
  iterator.iterate(5);
}

ArrayIter.prototype = Object.create(Iterator.prototype);

function ArrayIter(args) {
  Iterator.call(this);
  this.args = args;
  this.max = args.length;
}

RangeIter.prototype = Object.create(Iterator.prototype);

function RangeIter(from, to) {
  Iterator.call(this);
  this.args = getArgs(from, to);
  this.max = this.args.length;

  function getArgs(from, to) {
    var args = [];
    for (var i = from; i <= to; i++)
      args.push(i);
      return args;
  }
}

console.log("\nExpect: 1, 2, 3");
logFive(new Iterator(1, 2, 3));

console.log("\nExpect: 1, 2, 3, 4, 5");
logFive(new Iterator(1, 2, 3, 4, 5, 6, 7));

console.log("\nExpect: 1, 2, 3, 4");
logFive(new ArrayIter([1, 2, 3, 4]));

console.log("\nExpect: 101, 102, 103, 104, 105");
logFive(new RangeIter(101, 200));