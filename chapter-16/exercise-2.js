 var cx = document.querySelector("canvas").getContext("2d");
 var total = results.reduce(function(sum, choice) {
   return sum + choice.count;
 }, 0);

 var currentAngle = -0.5 * Math.PI;
 var centerX = 300, centerY = 150;

 results.forEach(function(result) {
   var sliceAngle = (result.count / total) * 2 * Math.PI;
   cx.beginPath();
   cx.arc(centerX, centerY, 100,
          currentAngle, currentAngle + sliceAngle);

   var middleAngle = currentAngle + 0.5 * sliceAngle;
   var textX = Math.cos(middleAngle) * 120 + centerX;
   var textY = Math.sin(middleAngle) * 120 + centerY;
   if (Math.cos(middleAngle) > 0)
     cx.textAlign = "left";
   else
     cx.textAlign = "right";
   cx.font = "16px sans-serif";
   cx.fillStyle = "black";
   cx.fillText(result.name, textX, textY);
   currentAngle += sliceAngle;
   cx.lineTo(centerX, centerY);
   cx.fillStyle = result.color;
   cx.fill();
 });