$(document).ready(function() {

  // draw border
  drawBorder();

  // event listener for tree button
  $('#trees').click(function() {
    var size = {x: canvas.width, y: canvas.height};
    var trunk = Math.ceil(Math.random() * 50);
    var randomRoot = Math.floor(Math.random() * size.x);

    getRandomColor();
    drawTrees(randomRoot, size.y, trunk, 0);
    drawBorder();

  });

  $('#clear').click(function() {

    clearCanvas();
    drawBorder();

  });

});
