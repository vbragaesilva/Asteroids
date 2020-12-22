
function Laser(spos, ang){
  this.pos = new p5.Vector(spos.x, spos.y);
  this.heading = ang;
  this.vel = p5.Vector.fromAngle(this.heading);
  this.vel.mult(8);
  this.toDie = false;
  
  this.show = function(){
    push();
    strokeWeight(4);
    stroke(255);
    point(this.pos.x, this.pos.y);
    pop();
  }
  
  this.update = function(){
    this.edges();
    this.pos.add(this.vel);
  }
  
  this.edges = function(){
  
    if(this.pos.x > w || this.pos.x < 0){
      this.die();
    }
    if(this.pos.y > h || this.pos.y  < 0){
      this.die();
    }
  }
  
  this.die = function(){
    this.toDie = true;
  }

  this.hits = function(ast){
    let d = dist(this.pos.x, this.pos.y, ast.pos.x, ast.pos.y);
    if(d < ast.r){
      return true;
    } else{
      return false;
    }
  }

}