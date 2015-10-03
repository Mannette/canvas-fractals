$(document).ready(function() {

  // event listener for tree button
  $('#trees').click(function() {

    var trunk = Math.ceil(Math.random() * 50);

    drawTrees(size.x / 2, size.y, trunk, 0);

  });

})
