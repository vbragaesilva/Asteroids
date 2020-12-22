function ran(p, m=0){
  return Math.random()*(p-m) + m;
}
//------------------------------------------------
function Asteroid(position, radius){
  
  if(position){
    this.pos = position.copy();
  }else{
    this.pos = new p5.Vector(ran(w), ran(h));
  }
  
  if(radius){
    this.r = radius*0.5;
  }else{
    this.r = ran(50, 30);
  }
  
  this.vel = p5.Vector.random2D();
  let frac = 50/this.r;
  let velmag = map(frac, 1, 6.6666, 1, 3.7);
  this.vel.mult(velmag);
  this.vNum = ran(9, 4);
  this.offset = [];
  for(let i = 0; i < this.vNum; i ++){
    this.offset[i] = ran(this.r*0.6, -this.r*0.6);
  }
  
  this.breakup = function(){
    let na = [];
    na[0] = new Asteroid(this.pos, this.r);
    na[1] = new Asteroid(this.pos, this.r);
    return na;
  }
  
  this.edges = function(){
    if(this.pos.x - this.r > w){
      this.pos.x = 0;
    }
    if(this.pos.x + this.r < 0){
      this.pos.x = w;
    }
    if(this.pos.y - this.r > h){
      this.pos.y = 0;
    }  
    if(this.pos.y + this.r < 0){
      this.pos.y = h;
    }
    
  }
  
  this.update = function(b){
    if(b){console.log(this.vel);}
    this.edges();
    this.pos.add(this.vel);
  }
  
  this.show = function(){
    push();
    
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(255);
    //ellipse(0, 0, this.r*2);
    beginShape();    
    for(let i = 0; i < this.vNum; i++){
      let ang = map(i, 0, this.vNum, 0, Math.PI*2);
      let tx = (this.r + this.offset[i]) * cos(ang);
      let ty = (this.r + this.offset[i]) * sin(ang);
      vertex(tx, ty);
    }
    endShape(CLOSE);
    
    pop();
  }
}

function Lin(x, y, pattern, sang){
  this.pos = new p5.Vector(x, y);
  this.p = pattern;
  this.w = 16;
  this.ang = sang;
  this.t = 255;
  //this.vel
  if(this.p == 0){
    this.ang -= Math.PI/2;
    this.vel = p5.Vector.fromAngle(this.ang);
    this.vel.mult(0.5);
    this.offset = -Math.PI/2;
    //this.vel = new p5.Vector(-0.5, -0.25);
    }else if(this.p == 1){
      this.ang += Math.PI/2;
      this.vel = p5.Vector.fromAngle(this.ang);
      this.vel.mult(0.5);
      this.offset = Math.PI/2;
      //this.vel = new p5.Vector(0.5, -0.25);
    }else{
      this.ang += Math.PI;
      this.vel = p5.Vector.fromAngle(this.ang);
      this.vel.mult(0.5);
      this.offset = Math.PI;
      //this.vel = new p5.Vector(0, 0.55);
    }
  
  this.be = function(){ 
  
    if(pattern == 0){
      this.begin = new p5.Vector(this.pos.x-this.w/2, this.pos.y + 16);
      this.end = new p5.Vector(this.pos.x+this.w/2, this.pos.y - 20);
    }else if(pattern == 1){
      this.begin = new p5.Vector(this.pos.x-this.w/2, this.pos.y - 20);
      this.end = new p5.Vector(this.pos.x+this.w/2, this.pos.y + 16);
    }else{
      this.begin = new p5.Vector(this.pos.x - this.w, this.pos.y);
      this.end = new p5.Vector(this.pos.x + this.w, this.pos.y);
    }
  }
  
  this.be();
  
  this.render = function(){
    push();
    stroke(255, this.t);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    this.t -= 3;
    pop();
  }
  
  this.update = function(){
    this.pos.add(this.vel);
    this.be();
    
  }
  
}