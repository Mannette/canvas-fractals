$(document).ready(function() {

  // event listener for tree button
  $('#trees').click(function() {

    var level = Math.floor(Math.random() * 4);
    drawTrees(size.x / 2, size.y, 20, level);

  });
  
})
