function Ship(backgroundCol){
  this.pos = new p5.Vector(w/2, h/2);
  this.r = 20;
  this.heading = -Math.PI /2;
  this.way = 0;
  this.vel = new p5.Vector(0, 0);
  this.a = 0;
  this.isBoosting = false;
  this.isCL = true;
  this.canShoot = true;
  this.canEdge = true;
  
  this.render = function(bg){
    push();
    translate(this.pos.x, this.pos.y);
    fill(bg);
    rotate(this.heading + Math.PI /2);
    if(this.isCL){
      stroke(85);
    }else{
      stroke(255);
    }
    triangle(-this.r*0.8, this.r*0.8, this.r*0.8, this.r*0.8, 0, -this.r);
    if(this.isBoosting){
      //fill(255);
      triangle(this.r*0.4, this.r*0.8, -this.r*0.4, this.r*0.8, 0, this.r*1.2);
    }
    pop();
  }
  
  this.hits = function(ast){
    let d = dist(this.pos.x, this.pos.y, ast.pos.x, ast.pos.y); 
    if(d < this.r + ast.r + 1 && !this.isCL){
      return true;
    }else{
      return false;
    }
  }
  
  this.update = function(){
    this.boost();
    this.pos.add(this.vel);
    this.vel.mult(0.9925);
    
  }
  
  this.boost = function(){
    var b = p5.Vector.fromAngle(this.heading);
    b.mult(0.2);
    b.mult(this.a);
    this.vel.add(b);
  }
  
  this.turn = function(){
    this.heading += 0.1*this.way;  
  }
  
  this.edges = function(){
    if(this.pos.x > w){
      this.pos.x = 0;
    }
    if(this.pos.x < 0){
      this.pos.x = w;
    }
    if(this.pos.y > h){
      this.pos.y = 0;
    }
    if(this.pos.y < 0){
      this.pos.y = h;
    }
    
  }
  
  this.setWay = function(wayy){
    this.way = wayy;
  }

  this.reset = function(){
    this.canShoot = true;
    this.vel.mult(0);
    this.pos.x = w/2;
    this.pos.y = h/2;
  }
  
}
