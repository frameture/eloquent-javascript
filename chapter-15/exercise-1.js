function runGame(plans, Display) {
  var lives = 3;
  function startLevel(n) {
    runLevel(new Level(plans[n]), Display, function(status) {
      console.log("lives:", lives);
      if (status == "lost") {
        lives--;
        if (lives < 1) {
          runGame(GAME_LEVELS, DOMDisplay);
        }
        startLevel(n);
      }
      else if (n < plans.length - 1)
        startLevel(n + 1);
      else
        console.log("You win!");
    });
  }
  startLevel(0);
}
runGame(GAME_LEVELS, DOMDisplay);