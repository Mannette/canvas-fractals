// function to draw the trees
function drawTrees(startX, startY, trunkWidth, level) {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var size = {x: canvas.width, y: canvas.height};

  if (level < 12) {

    var changeX = 100 / (level + 1);
    var changeY = 200 / (level + 1);

    var topRightX = startX + Math.random() * changeX;
    var topRightY = startY - Math.random() * changeY;

    var topLeftX = startX - Math.random() * changeX;
    var topLeftY = startY - Math.random() * changeY;

    context.strokeStyle = color;

    // draw right branch
    context.beginPath();
    context.moveTo(startX + trunkWidth / 4, startY);
    context.quadraticCurveTo(startX + trunkWidth / 4, startY - trunkWidth, topRightX, topRightY);
    context.lineWidth = trunkWidth;
    context.lineCap = 'round';
    context.stroke();

    // draw left branch
    context.beginPath();
    context.moveTo(startX - trunkWidth / 4, startY);
    context.quadraticCurveTo(startX - trunkWidth / 4, startY - trunkWidth, topLeftX, topLeftY);
    context.lineWidth = trunkWidth;
    context.lineCap = 'round';
    context.stroke();

    drawTrees(topRightX, topRightY, trunkWidth * 0.5, level + 1);
    drawTrees(topLeftX, topLeftY, trunkWidth * 0.5, level + 1);
  }
}
