function drawStar(radius, color) {
  var cx = document.querySelector("canvas").getContext("2d");
  var xCenter = x + radius, 
  var yCenter = y + radius;
    cx.beginPath();
    cx.moveTo(xCenter + radius, yCenter);
    for (var i = 1; i <= 8; i++) {
      var angle = i * Math.PI / 4;
      cx.quadraticCurveTo(xCenter, yCenter,
                          xCenter + Math.cos(angle) * radius,
                          yCenter + Math.sin(angle) * radius);
    }
    cx.fillStyle = color;
    cx.fill();
}

function drawSpiral(loops) {
  var cx = document.querySelector("canvas").getContext("2d");
  cx.beginPath();
  cx.translate(300, 300);
  for (var i = 0; i < loops; i++) {
    cx.lineTo(i / 2, i / 2);
    cx.rotate(.1 * Math.PI);
    cx.translate(1, 1);
  }
  cx.stroke();
}

function drawTrapezoid() {
  cx.moveTo(100, 100);
  cx.lineTo(150, 100);
  cx.lineTo(200, 150);
  cx.lineTo(50, 150);
  cx.closePath();
  cx.stroke();
}

function drawRedDiamond() {
  var cx = document.querySelector("canvas").getContext("2d");
  cx.fillStyle = "red";
  cx.beginPath();
  cx.moveTo(100, 100);
  cx.lineTo(125, 150);
  cx.lineTo(100, 200);
  cx.lineTo(75, 150);
  cx.closePath();
  cx.fill();
}

function drawZigZag(lines) {
  var cx = document.querySelector("canvas").getContext("2d");
  cx.beginPath();
  for (var i = 0; i < lines; i++) {
    var x = (i % 2) == 0? 200 : 100;
    cx.lineTo(x, i * 15);
  }
  cx.stroke();
}