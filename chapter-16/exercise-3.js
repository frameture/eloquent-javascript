var cx = document.querySelector("canvas").getContext("2d");

var lastTime = null;
function frame(time) {
   if (lastTime != null)
     updateAnimation(Math.min(100, time - lastTime) / 1000);
   lastTime = time;
   requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

var x = 100;
var y = 300;
var r = 10;
var speedX = 100; 
var speedY = 60;

function updateAnimation(step) {
  cx.clearRect(0, 0, 400, 400);
  cx.strokeStyle = "blue";
  cx.lineWidth = 4;
  cx.strokeRect(25, 25, 350, 350);
  
  x += step * speedX;
  y += step * speedY;
  if (x < 25 + r || x > 375 - r)
    speedX = -speedX;
  if (y < 25 + r || y > 375 - r)
    speedY = -speedY;
  cx.fillStyle = "blue";
  cx.beginPath();
  cx.arc(x, y, r, 0, 7);
  cx.fill();
}