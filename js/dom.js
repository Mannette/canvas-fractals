$(document).ready(function() {

  // draw border
  drawBorder();
  var pythag = false;

  // button to draw some random trees
  $('#trees').click(function() {
    var size = {x: canvas.width, y: canvas.height};
    var trunk = Math.ceil(Math.random() * 50);
    var randomRoot = Math.floor(Math.random() * size.x);

    getRandomColor();
    drawTrees(randomRoot, size.y, trunk, 0);
    drawBorder();

  });

  // button to draw the pythagoras tree
  $('#pythag').click(function() {
    Pythagoras();
    pythag = true;
    if (pythag) {
      $('#canvas').mousemove(function(e) {
        var page = {x: e.pageX, y: e.pageY};
            Pythagoras.prototype.update({
              x: page.x,
              y: page.y
            });
      });
    }
  });

  $('#clear').click(function() {
    clearCanvas();
    drawBorder();
    $('#canvas').off('mousemove');
  });

  // $('#canvas').mousemove(function(e) {
  //   var elem_loc = this.getPosition();
  // 			Pythagoras.prototype.update({
  // 				x: e.page.x - elem_loc.x,
  // 				y: e.page.y - elem_loc.y
  //      });

      // });
});
