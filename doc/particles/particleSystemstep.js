smash.ParticleSystem.prototype.step = function() {
  this.emitters.forEach(function appendNewParticles(a) {
    this.particles.push.apply(this.particles, a.getNewParticles())
  }, this);
  var newParticles = [];
  function stepParticle(a) {
    a.step();
  }
  function verifyIfAlive(a) {
    if (0 <= a.positionX && a.positionX < smash.ParticleSystem.CANVAS_WIDTH && 
	    0 <= a.positionY && a.positionY < smash.ParticleSystem.CANVAS_HEIGHT && 
	    a.age < a.lifespan) {
	  newParticles.push(a);
	}
  }
  this.particles.forEach(function (a) {
    stepParticle(a);
    verifyIfAlive(a);
  }, this);
  this.particles = newParticles;
};