// draw the border
function drawBorder() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var size = {x: canvas.width, y: canvas.height};

  context.strokeRect(0, 0, size.x, size.y);
}


var color = '#';

// function to get random color
function getRandomColor() {
  var letters = '0123456789ABCDEF';

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
}

// function to clear canvas
function clearCanvas() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var size = {x: canvas.width, y: canvas.height};
  color = '#';

  context.clearRect(1, 1, size.x - 2, size.y - 2);
  // context.strokeRect(0, 0, size.x, size.y);
}
