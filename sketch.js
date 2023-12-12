//const w = 400;
//const h = 400;
var nina = false;
var backgroundCol = 0;
const hiscore_vbs = 21780;
const w = 1350;
const h = 575;
var hud;
var ship;
var asteroids = [];
var lasers = [];
var score = 0;
var scoreControl = 0;
var deathControl = 0;
var linesDisplayed = false;
var linhas = [];

var gameLevel = 1;
const initialAsteroids = gameLevel+4;

var lControl = 0;
var lTold = false;
var joaoKleber = false;
var vidas = 3;
var clControl = 0;
var clTold = false;
var levelH;

var hacks = false;


var laserSound = new p5.SoundFile('sounds/laser.mp3');

var bangLarge = new p5.SoundFile('sounds/bangLarge.wav');

var bangMedium = new p5.SoundFile('sounds/bangMedium.wav');

var bangSmall = new p5.SoundFile('sounds/bangSmall.wav');

var thrust =  new p5.SoundFile('sounds/thrust.wav');

var volu = 1;

var av = 0; //Auxiliar do volume 
var am = 0; //Auxiliar da metralhadora
var met = false;//metralhadora ativada?
  
function updateHS(){
  sessionStorage.setItem("sessionScore", score);
  if(score > localStorage.getItem("localUserHighscore")){
    localStorage.setItem("localUserHighscore", score);
  }
}

function preload(){
  document.getElementById('volslider').value = localStorage.getItem("lastvolu");
  sessionStorage.setItem("sessionScore", score);
}

function setup() {
  createCanvas(w, h);
  levelH = new LevelHud();
  hud = new Hud();
  ship  = new Ship(backgroundCol);
  for(let i = 0; i < initialAsteroids; i ++){
    asteroids.push(new Asteroid());
  }
}

function draw() {
  
  if(av == 0){//salva o volume do slider no localStorage a cada 180 frames.
    localStorage.setItem("lastvolu", volu);
    av++;
  }else{
    av = (av + 1)%180;
  }
  
  volu = document.getElementById('volslider').value;
  laserSound.setVolume(volu/125);
  bangLarge.setVolume(volu/100);
  bangMedium.setVolume(volu/100);
  bangSmall.setVolume(volu/100);
  thrust.setVolume(volu/100);
  
  background(backgroundCol);

  if(ship.isCL && ! clTold){
    clControl = 1;
    clTold = true;
  }
  
  if(clControl != 0){
    if(clControl == 120){
      ship.isCL = false;
      clTold = false;
    }
    clControl = (clControl + 1)%121;
  }
  
  for(let a in asteroids){
    if(ship.hits(asteroids[a])){
      deathControl = 1;
    }
    asteroids[a].update();
    asteroids[a].show();
  }
  
  for(let l in lasers){
    lasers[l].update();
    lasers[l].show();
    
    for(let j in asteroids){
      if(lasers[l].hits(asteroids[j])){
        if(asteroids[j].r > 13){
          if(asteroids[j].r > 25){
            bangLarge.play();
            score += 20;
            scoreControl +=20;
          }else{
            bangMedium.play();
            score += 50;
            scoreControl +=50;
          }
          let newAst = asteroids[j].breakup();
          asteroids = asteroids.concat(newAst);
        }else{
          bangSmall.play();
          score += 100;
          scoreControl += 100;
        }
        
        asteroids.splice(j, 1);
        lasers[l].die();
        updateHS();//update highscore
        break;
      }
    }
    if(lasers[l].toDie){
      lasers.splice(l, 1);
    }
  }
  
  if(asteroids.length == 0 && !lTold){
    lControl = 1;
    gameLevel ++;
    lTold = true;
  }
  
  //render HUDS
  
  levelH.render();
  hud.render(backgroundCol);
  
  if(ship.canEdge){
    ship.edges();
  }
  ship.update();
  if(deathControl == 0 && !joaoKleber){
    ship.render(backgroundCol);
    linhas = [];
    linesDisplayed = false;
  }else if(deathControl == 119){
    ship.reset();
    ship.isCL = true;
    ship.canEdge = true;
    deathControl = (deathControl + 1)%121;
  }else{
    deathControl = (deathControl + 1)%121;
    if(!linesDisplayed){
      ship.canEdge = false;
      let sang = ship.heading;
      let lx = ship.pos.x;
      let ly = ship.pos.y;
      ship.pos.x = w*2;
      ship.pos.y = h*2;
      ship.canShoot = false;
      
      vidas--;
      linhas.push(new Lin(lx-8, ly, 0, sang));
      linhas.push(new Lin(lx+8, ly, 1, sang));
      linhas.push(new Lin(lx, ly + 16, 2, sang));
      linesDisplayed = true;
    }
    if(linhas.length > 0){
      for(let l in linhas){
        linhas[l].update();
        linhas[l].render();
      }
    }
  
  }
  ship.turn();
  
  textFont('Nova Square');
  //score


  textSize(25);
  fill(36, 36, 36);
  text(asteroids.length, w - 50, 50);

  if(lControl != 0 && !joaoKleber){
    if(lControl == 179){
      ship.isCL = true;
      lTold = false;
      for(let i = 0; i < gameLevel+4; i++){
        asteroids.push(new Asteroid());
        
      }
    }
    lControl = (lControl + 1)%181;
  }
  
  if(joaoKleber){
    ship.reset();
    ship.canShoot = false;
    push();
    textSize(40);
    fill(255);
    text('Game Over! ', w/2 - 100, 100);
    text(`VBS ${hiscore_vbs}\nVocê ${localStorage.getItem("localUserHighscore")}`, w/2 - 85, 175);
    //text(`VBS ${maxscore}`, w/2 - 85, 175);
    pop();
  }
  
  if(scoreControl > 10000){
    vidas++;
    scoreControl -= 10000;
  }
  
  if(vidas == -1){
    joaoKleber = true;
    
  }
  if(vidas < 0){
    vidas = 0;
  }
  if(am == 0 && met){
    if(keyIsDown(17) && ship.canShoot){
      lasers.push(new Laser(ship.pos, ship.heading));
       laserSound.play();
    }
    am++;
  }else{
    am = (am+1)%6;
  }
}


function keyReleased(){
  if(keyCode === RIGHT_ARROW && ship.way == 1){
    ship.setWay(0)
  }
  if(keyCode === LEFT_ARROW && ship.way == -1){
    ship.setWay(0)
  }
  if(keyCode === UP_ARROW){
    thrust.stop();
    ship.a = 0;
    ship.isBoosting = false;
  }
}
function keyPressed(){
  
  if( (keyCode == 32 || keyCode == 17 || keyCode == 18) && ship.canShoot){
    lasers.push(new Laser(ship.pos, ship.heading));
    laserSound.play();
  }
  
  if(keyCode === RIGHT_ARROW){
    ship.setWay(1);
  }
  if(keyCode === LEFT_ARROW){
    ship.setWay(-1);
  }
  if(keyCode === UP_ARROW && ship.canShoot){
    thrust.loop();
    ship.a = 1;
    ship.isBoosting = true;
  }
  if(keyCode == 36 && !hacks){
    hacks = true;
  }
  
  //HACKSSSSSS C E LOKO
  
  if(keyCode == 33 && hacks){//PageUp
    asteroids.push(new Asteroid());
  }  
  if(keyCode == 34 && hacks){//PageDown
    asteroids.pop();
  }
  if(keyCode == 81 && hacks){//Q
    ship.isCL = true;
  }
  if(keyCode == 84 && hacks){//T
    vidas++;
  }
  if(keyCode == 86 && hacks){// V
    if(!nina){nina = true}
  }
  if(keyCode == 8 && hacks && nina){// Backspace
    backgroundCol = "#5a000a";
  }
  if(keyCode == 77 && hacks && !met){
     met = true;
  }
  
  return false;
}




