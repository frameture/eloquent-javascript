
function readFile(name) {
  var FILES = {
    "test": "123",
    "grid": 'exports.directionNames = "n ne e se s sw w nw".split(" ");\
      exports.directions = {\
        "n":  new Vector( 0, -1),\
        "ne": new Vector( 1, -1),\
        "e":  new Vector( 1,  0),\
        "se": new Vector( 1,  1),\
        "s":  new Vector( 0,  1),\
        "sw": new Vector(-1,  1),\
        "w":  new Vector(-1,  0),\
        "nw": new Vector(-1, -1)\
      };\
      function Grid(width, height) {\
        this.space = new Array(width * height);\
        this.width = width;\
        this.height = height;\
      }\
      Grid.prototype.isInside = function(vector) {\
        return vector.x >= 0 && vector.x < this.width &&\
                vector.y >= 0 && vector.y < this.height;\
      };\
      Grid.prototype.get = function(vector) {\
        return this.space[vector.x + this.width * vector.y];\
      };\
      Grid.prototype.set = function(vector, value) {\
        this.space[vector.x + this.width * vector.y] = value;\
      };\
      Grid.prototype.forEach = function(f, context) {\
        for (var y = 0; y < this.height; y++) {\
          for (var x = 0; x < this.width; x++) {\
            var value = this.space[x + y * this.width];\
            if (value != null)\
              f.call(context, value, new Vector(x, y));\
          }\
        }\
      };\
      exports.Grid = function(width, height) {return new Grid(width, height);};\
      function Vector(x, y) {\
        this.x = x;\
        this.y = y;\
      }\
      Vector.prototype.plus = function(other) {\
        return new Vector(this.x + other.x, this.y + other.y);\
      };\
      exports.Vector = function(x, y) {return new Vector(x, y);};',
    "world": 'exports.directions = {\
        "n":  new Vector( 0, -1),\
        "ne": new Vector( 1, -1),\
        "e":  new Vector( 1,  0),\
        "se": new Vector( 1,  1),\
        "s":  new Vector( 0,  1),\
        "sw": new Vector(-1,  1),\
        "w":  new Vector(-1,  0),\
        "nw": new Vector(-1, -1)\
      };\
      function LifelikeWorld(map, legend) {\
        World.call(this, map, legend);\
      }\
      LifelikeWorld.prototype = Object.create(World.prototype);\
      var actionTypes = Object.create(null);\
      actionTypes.reproduce = function(critter, vector, action) {\
        var baby = elementFromChar(this.legend,         // baby of the same type\
                                  critter.originChar); \
        var dest = this.checkDestination(action, vector);\
        if (dest == null ||                      // valid destination\
            critter.energy <= 2 * baby.energy || // not enough energy\
            this.grid.get(dest) != null)         // dest not empty\
          return false; // action not performed\
        critter.energy -= 2 * baby.energy;\
        this.grid.set(dest, baby);\
        return true;   // performed\
      };\
      actionTypes.eat = function(critter, vector, action) {\
        var dest = this.checkDestination(action, vector);\
        var atDest = dest != null && this.grid.get(dest); // must be valid destination && dest must not be empty\
        if (!atDest || atDest.energy == null)             // dest must contain some energy (plant, other critter)\
          return false; // action no performed\
        critter.energy += atDest.energy; \
        this.grid.set(dest, null);\
        return true;   // action performed\
      };\
      actionTypes.move = function(critter, vector, action) {\
        var dest = this.checkDestination(action, vector); \
        if (dest == null ||              // is there a valid destination\
            critter.energy <= 1 ||       // not enough energy\
            this.grid.get(dest) != null) // (dest) destination is not empty\
          return false; // action not performed\
        critter.energy -= 1;          // critter will move - use energy\
        this.grid.set(vector, null); \
        this.grid.set(dest, critter); // move the critter\
        return true;   // action performed\
      };\
      actionTypes.grow = function(critter) {\
        critter.energy += 0.5; // plant gets half a point of energy\
        return true;           // action performed\
      };\
      LifelikeWorld.prototype.letAct = function(critter, vector) {\
        var action = critter.act(new View(this, vector));\
        var handled = action &&         // check if action is returned\
          action.type in actionTypes && // if theres that action in actionTypes\
          actionTypes[action.type].call(this, critter,   // if action is done\
                                        vector, action); // call with this - World object\
        if (!handled) {                  // if clitter not handled \
          critter.energy -= 0.2;         // - it loses 1/5 point of energy\
          if (critter.energy <= 0)       // if energy below or equal to 0\
            this.grid.set(vector, null); // remove the clitter\
        }\
      };\
      exports.LifeLikeWorld = function() {return new LifelikeWorld(map, legend);};\
      function View(world, vector) {\
        this.world = world;\
        this.vector = vector;\
      }\
      View.prototype.look = function(dir) {\
        var target = this.vector.plus(exports.directions[dir]);\
        if (this.world.grid.isInside(target))\
          return charFromElement(this.world.grid.get(target));\
        else\
          return "#"; // is outside - wall -- world without wall #\
                      // pretended borders - critters will stay in boundaries\
      };\
      View.prototype.findAll = function(ch) { // all grid.directions with ch\
        var found = [];\
        for (var dir in exports.directions)\
          if (this.look(dir) == ch)\
            found.push(dir);\
        return found;\
      };\
      View.prototype.find = function(ch) {\
        var found = this.findAll(ch);\
        if (found.length == 0) return null;\
        return randomElement(found); // return random direction from findAll(ch) array\
      };\
      exports.View = function(world, vector) {return new View(world, vector);};\
      World.prototype.letAct = function(critter, vector) {\
        var action = critter.act(new View(this, vector));\
        if (action && action.type == "move") {\
          var dest = this.checkDestination(action, vector);\
          if (dest && this.grid.get(dest) == null) {\
            this.grid.set(vector, null); // make previous space empty\
            this.grid.set(dest, critter); // new critter\'s position\
          }\
        }\
      };\
      World.prototype.checkDestination = function(action, vector) {\
        if (exports.directions.hasOwnProperty(action.direction)) {\
          var dest = vector.plus(exports.directions[action.direction]);\
          if (this.grid.isInside(dest))\
            return dest;\
        }\
      };\
      World.prototype.turn = function() {\
        var acted = [];\
        this.grid.forEach(function(critter, vector) {\
          if (critter.act && acted.indexOf(critter) == -1) {\
            acted.push(critter);\
            this.letAct(critter, vector);\
          }\
        }, this);\
      };\
        // translating world to string\
      exports.charFromElement = function(element) {\
        if (element == null)\
          return " ";\
        else\
          return element.originChar;\
      }\
        World.prototype.toString = function() {\
        var output = "";\
        for (var y = 0; y < this.grid.height; y++) {\
          for (var x = 0; x < this.grid.width; x++) {\
            var element = this.grid.get(gridModule.Vector(x, y));\
            output += charFromElement(element);\
          }\
          output += "\n";\
        }\
        return output;\
      };\
      exports.elementFromChar = function (legend, ch) {\
        if (ch == " ")\
          return null;\
        var element = new legend[ch]();\
        element.originChar = ch;\
        return element;\
      }\
      function World(map, legend) {\
        var grid = grid.Grid(map[0].length, map.length);\
        this.grid = grid;\
        this.legend = legend;\
        map.forEach(function(line, y) {         // 2 loops looping through map - arrays\
          for (var x = 0; x < line.length; x++) // looping through array elements\
            grid.set(gridModule.Vector(x, y),          // setting grid\'s characters - building a world\
                    elementFromChar(legend, line[x])); // understanding characters\
        });\
      }\
      exports.World = function(map, legend){return new World(map, legend);};\
      exports.randomElement = function(array) {\
        return array[Math.floor(Math.random() * array.length)];\
      }', 
    "simple-ecosystem": 'var gridModule = require("grid");\
      exports.randomElement = function(array) {\
        return array[Math.floor(Math.random() * array.length)];\
      }\
      exports.dirPlus = function(dir, n) {\
        var index = gridModule.directionNames.indexOf(dir);\
        return gridModule.directionNames[(index + n + 8) % 8];\
      }\
      // Wall object - simple - no methods\
      function Wall() {}\
      exports.Wall = function() {return new Wall();};\
      function BouncingCritter() {\
        this.direction = randomElement(gridModule.directionNames);\
      };\
      BouncingCritter.prototype.act = function(view) {\
        if (view.look(this.direction) != " ")\
          this.direction = view.find(" ") || "s";\
        return {type: "move", direction: this.direction};\
      };\
      exports.BouncingCritter = function () {return new BouncingCritter();};\
      function WallFollower() {\
        this.dir = "s";\
      }\
      WallFollower.prototype.act = function(view) {\
        var start = this.dir;\
        if (view.look(dirPlus(this.dir, -3)) != " ") // check if there was an obstacle\
          start = this.dir = dirPlus(this.dir, -2); // start scanning from the left side of the clitter\
        while (view.look(this.dir) != " ") {\
          this.dir = dirPlus(this.dir, 1); // if no obstacle - start scanning from straight\
          if (this.dir == start) break;    // if full cycle of scanning is done - stop - clitter is walled in -  has no move.\
        }\
        return {type: "move", direction: this.dir};\
      };\
      exports.WallFollower = function() {return new WallFollower();};',
    "ecosystem": 'function Wall() {}\
      exports.Wall = function() {return new Wall();};\
      function PlantEater() {\
        this.energy = 20;\
      }\
      PlantEater.prototype.act = function(view) {\
        var space = view.find(" "); // find empty space\
        if (this.energy > 60 && space) // reproduce\
          return {type: "reproduce", direction: space};\
        var plant = view.find("*"); // "*" - is a plant character\
        if (plant) // plant found nearby - eat it\
          return {type: "eat", direction: plant};\
        if (space) // mo plants, only empty space\
          return {type: "move", direction: space};\
      };\
      exports.PlantEater = function() {return new PlantEater();};\
      function Plant() {\
        this.energy = 3 + Math.random() * 4; // initial energy between 3 - 7  \
      }\
      Plant.prototype.act = function(view) {\
        if (this.energy > 15) { // if energy more than 15 - reproduce in empty space\
          var space = view.find(" ");\
          if (space)\
            return {type: "reproduce", direction: space};\
        }\
        if (this.energy < 20)   // it grows until getting 20 points of energy\
          return {type: "grow"};\
      };\
      exports.Plant = function() {return new Plant();};\
      function SmartPlantEater() {\
        this.energy = 20;\
      }\
      SmartPlantEater.prototype.act = function(view) {\
        var space = view.find(" ");\
        var plant = view.find("*");\
        if (this.energy > 100 && space && plant)\
          return {type: "reproduce", direction: space};\
        if (plant && this.energy <= 100)\
          return {type: "eat", direction: plant};\
        if (space && !plant)\
          return {type: "move", direction: space};\
        else return false;\
      };\
      exports.SmartPlantEater = function() {return new SmartPlantEater();};\
      function Tiger() {\
        this.energy = 60;\
      }\
      Tiger.prototype.act = function(view) {\
        var space = view.find(" ");\
        var hervibore = view.find("O");\
        if (this.energy > 180 && space)\
          return {type: "reproduce", direction: space} \
        if (hervibore)\
          return {type: "eat", direction: hervibore}; \
        if (space)\
          return {type: "move", direction: space};\
        else return false;\
      }\
      exports.Tiger = function() {return new Tiger();};'
  };
  
  return FILES[name];
}