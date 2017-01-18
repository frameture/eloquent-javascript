function Tiger() {
  this.energy = 60;
}

Tiger.prototype.act = function(view) {
  var space = view.find(" ");
  var hervibore = view.find("O");

  if (this.energy > 180 && space)
    return {type: "reproduce", direction: space} 
  if (hervibore)
    return {type: "eat", direction: hervibore}; 
  if (space)
    return {type: "move", direction: space};
  else return false;
}