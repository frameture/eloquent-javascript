var month = function() {
  var _MONTHS = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];
  return {
    name: function(number) { return _MONTHS[number]; },
    number: function(month) { return _MONTHS.indexOf(month); }
  };
}();

console.log(month.name(2), "Expect March");
console.log(month.number("November"), "Expect 10");