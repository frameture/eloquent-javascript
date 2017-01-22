var paused = false;
document.body.addEventListener("keydown", function(e) {
    if (e.keyCode == 27) {
        paused = !paused;
        console.log(paused ? "Paused" : "Resumed");
      }
  });

function runLevel(level, Display, andThen) {
  var display = new Display(document.body, level);
  runAnimation(function(step) {
    if (!paused) {
      level.animate(step, arrows);
      display.drawFrame(step);
      if (level.isFinished()) {
        display.clear();
        if (andThen)
          andThen(level.status);
        return false;
      }
    }
  });
}
runGame(GAME_LEVELS, DOMDisplay);