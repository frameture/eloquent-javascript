var cat = document.querySelector("#cat");
var hat = document.querySelector("#hat");

var angle = 0, lastTime = null;
function animate(time) {
  if (lastTime != null)
    angle += (time - lastTime) * 0.0015;
  lastTime = time;

  cat.style.top = (Math.sin(angle) * 50 + 80) + "px";
  cat.style.left = (Math.cos(angle) * 200 + 230) + "px";
  // By adding π to the angle, the hat ends up half a circle ahead of the cat
  var hatAngle = angle + Math.PI;
  hat.style.top = (Math.sin(hatAngle) * 50 + 80) + "px";
  hat.style.left = (Math.cos(hatAngle) * 200 + 230) + "px";

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);