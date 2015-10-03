$(document).ready(function() {

  // event listener for tree button
  $('#trees').click(function() {

    var trunk = Math.ceil(Math.random() * 50);
    var randomRoot = Math.floor(Math.random() * size.x);

    getRandomColor();
    drawTrees(randomRoot, size.y, trunk, 0);

  });

});
