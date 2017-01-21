var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

function buildTable(data) {
  var table = document.createElement("table");
  var properties = Object.keys(data[0]);
  var header = document.createElement("tr");

  // create the header
  var textNode, th;
  for (var i = 0; i < properties.length; i++) {
    textNode = document.createTextNode(properties[i]);
    th = document.createElement("th");
    th.appendChild(textNode);
    header.appendChild(th);
  }
  table.appendChild(header);
  
  // create the rows
  data.forEach(function(obj) {
    var row = document.createElement("tr");
    for (var i = 0; i < properties.length; i++) {
      var item = document.createElement("td");
      if (Number.isInteger(obj[properties[i]]))
        item.style.textAlign = "right";
      var text = document.createTextNode(obj[properties[i]]);
      item.appendChild(text);
      row.appendChild(item);
    }
    table.appendChild(row);
  });
  return table;
}

function test() {
  document.getElementsByTagName("div")[0].appendChild(buildTable(MOUNTAINS));
}