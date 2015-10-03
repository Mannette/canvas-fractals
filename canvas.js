var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var size = {x: canvas.width, y: canvas.height};
var pixelSize = 5;

// draw the border
function drawBorder() {
  context.strokeRect(0, 0, size.x, size.y)
}
drawBorder();
