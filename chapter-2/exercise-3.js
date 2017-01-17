function exe_3() {
  var grid = "";
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if ( (i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1) )
        grid += "#";
      else
        grid += " ";
    }
    grid += "\n";
  }
  console.log(grid);
}

exe_3();