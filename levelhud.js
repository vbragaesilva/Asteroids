function LevelHud() {
  var size = 20;
  var padding = 10;

  var digitMaps = [
    [true, true, true, false, true, true, true], 
    [false, false, true, false, false, true, false],
    [true, false, true, true, true, false, true], 
    [true, false, true, true, false, true, true], 
    [false, true, true, true, false, true, false], 
    [true, true, false, true, false, true, true], 
    [true, true, false, true, true, true, true], 
    [true, false, true, false, false, true, false], 
    [true, true, true, true, true, true, true], 
    [true, true, true, true, false, true, true] 

  ];

  this.render = function() {
    var scoreString = "" + gameLevel;
    var x = (width/16 - (scoreString.length * (size + padding))) / 2;
    var digitPos = createVector(x, padding);
    for(var i = 0; i < scoreString.length; i++) {
      var dmap = digitMaps[scoreString.charAt(i)];
      drawDigit(dmap, i, digitPos);
      digitPos.x += size + padding;
    }
    
  }


  function drawDigit(digitMap, index, pos) {
    push();
    stroke(255);
    for(var i = 0; i < digitMap.length; i++) {
      if(digitMap[i] === true)
        drawLine(i, pos);
    }
    pop();
  }

  function drawLine(lineMap, pos) {
    switch(lineMap) {
      case 0:
        line(pos.x, pos.y, pos.x + size, pos.y);
        break;
      case 1:
        line(pos.x, pos.y, pos.x, pos.y + size);
        break;
      case 2:
        line(pos.x + size, pos.y, pos.x + size, pos.y + size);
        break;
      case 3:
        line(pos.x, pos.y + size, pos.x + size, pos.y + size);
        break;
      case 4:
        line(pos.x, pos.y + size, pos.x, pos.y + 2 * size);
        break;
      case 5:
        line(pos.x + size, pos.y + size, pos.x + size, pos.y + 2 * size);
        break;
      case 6:
        line(pos.x, pos.y + size * 2, pos.x + size, pos.y + 2 * size);
        break;
      default:
        console.log("line map is invalid");
        break;
    }
  }
}