function SmartPlantEater() {
  this.energy = 20;
}

SmartPlantEater.prototype.act = function(view) {
  var space = view.find(" ");
  var plant = view.find("*");

  if (this.energy > 100 && space && plant)
    return {type: "reproduce", direction: space};
  if (plant && this.energy <= 100)
    return {type: "eat", direction: plant};
  if (space && !plant)
    return {type: "move", direction: space};
  else return false;
};