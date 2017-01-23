function start() {
  var grid = document.querySelector("#grid");
  var gridArray = [];
  var cellsToChange = []; // cells that will change its state after grid checking
  var size = 20;
  fillGrid();

  document.querySelector("#next").addEventListener("click", nextGeneration);

  function fillGrid() {
    for (var i = 0; i < size; i++) {
      var div = document.createElement("div");
      var array = [];
      for (var j = 0; j < size; j++) {
        var cell = document.createElement("input");
        cell.type = "checkbox";
        cell.checked = Math.random() >= 0.8 ? true : false;
        div.appendChild(cell);
        array.push(cell); 
      }
      grid.appendChild(div);
      gridArray.push(array);
    }
  }

  function nextGeneration() {
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++)
        checkNeighbours(i, j);
    }
    applyChanges();
  }

  function checkNeighbours(row, col) {
    var cell = gridArray[row][col];
    var total = checkHorizontally(row, col) +
                checkVertically(row, col) +
                checkDiagonally(row, col);

    if (!cell.checked && total == 3)
      cellsToChange.push(cell);
    else if (cell.checked && (total < 2 || total > 3))
      cellsToChange.push(cell); 
  }

  function checkHorizontally(row, col) {
    var neighs = 0;
    if (col != 0 && gridArray[row][col - 1].checked) neighs++;
    if (col != size - 1 && gridArray[row][col + 1].checked) neighs++;
    return neighs;
  }

  function checkVertically(row, col) {
    var neighs = 0;
    if (row != 0 && gridArray[row - 1][col].checked) neighs++;
    if (row != size - 1 && gridArray[row + 1][col].checked) neighs++;
    return neighs;
  }

  function checkDiagonally(row, col) {
    var neighs = 0;

    if (row != 0 && col != 0 && gridArray[row - 1][col - 1].checked) 
      neighs++; // check top left

    if (row != 0 && col != size - 1 && gridArray[row - 1][col + 1].checked) 
      neighs++; // check top right

    if (row != size - 1 && col != size - 1 && gridArray[row + 1][col + 1].checked) 
      neighs++; // check bottom right

    if (row != size - 1 && col != 0 && gridArray[row + 1][col - 1].checked) 
      neighs++; // check bottom left

    return neighs;
  }

  function applyChanges() {
    while (cellsToChange.length != 0) {
      var cell = cellsToChange.pop();
      cell.checked = !cell.checked;
    }
  }
}