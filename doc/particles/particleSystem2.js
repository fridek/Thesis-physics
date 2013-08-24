/**
 * @fileoverview Particle system.
 * @author sebastian.poreba@gmail.com (Sebastian Poręba)
 */

goog.provide('smash.ParticleSystem2');

goog.require('smash.Particle');
goog.require('smash.ParticleEmitter');


/**
 * @constructor
 */
smash.ParticleSystem2 = function() {
  /**
   * @type {!Array.<smash.Particle>}
   */
  this.particles = [];

  /**
   * @type {!Array.<number>}
   */
  this.deadParticles = [];

  /**
   * @type {!Array.<smash.ParticleEmitter>}
   */
  this.emitters = [];

  if (smash.ParticleSystem2.DRAWING_ENABLED) {
    /**
     * @type {!Element}
     */
    this.canvas = window.document.createElement("canvas");
    this.canvas.width = smash.ParticleSystem2.CANVAS_WIDTH;
    this.canvas.height = smash.ParticleSystem2.CANVAS_HEIGHT;
    window.document.body.appendChild(this.canvas);

    /**
     * @type {!CanvasRenderingContext2D}
     */
    this.context = this.canvas.getContext('2d');

    /**
     * @type {!ImageData}
     */
    this.imageData = this.context.getImageData(0, 0,
        smash.ParticleSystem2.CANVAS_WIDTH, smash.ParticleSystem2.CANVAS_HEIGHT);

    /**
     * @type {!CanvasPixelArray}
     */
    this.pixels = this.imageData.data;
  }
};

/**
 * @const {boolean}
 */
smash.ParticleSystem2.DRAWING_ENABLED = true;

/**
 * @const {number}
 */
smash.ParticleSystem2.CANVAS_WIDTH = 1200;

/**
 * @const {number}
 */
smash.ParticleSystem2.CANVAS_HEIGHT = 400;


smash.ParticleSystem2.prototype.step = function() {
  if (smash.ParticleSystem2.DRAWING_ENABLED) {
    for (var i = 0; i < smash.ParticleSystem2.CANVAS_WIDTH *
        smash.ParticleSystem2.CANVAS_HEIGHT * 4; i+=4) {
      this.pixels[i] = 0;
      this.pixels[i + 1] = 0;
      this.pixels[i + 2] = 0;
      this.pixels[i + 3] = 0;
    }
  }

  for (var ei = 0; ei < this.emitters.length; ei++) {
    var emitter = this.emitters[ei];
    for (var i = 0; i < emitter.productionRate; i++) {
      var pIndex = this.deadParticles.pop();
      if (pIndex !== undefined) {
        var p = this.particles[pIndex];
        p.reset();
      } else {
        var p = new smash.Particle();
        this.particles.push(p);
      }

      p.lifespan = emitter.lifespan;
      p.positionX = emitter.positionX;
      p.positionY = emitter.positionY;
      p.velocityX = Math.sin(emitter.angle +
          (Math.random() - 0.5) * emitter.spread) *
          emitter.velocity * emitter.velocitySpread;
      p.velocityY = Math.cos(emitter.angle +
          (Math.random() - 0.5) * emitter.spread) *
          emitter.velocity *
          (1 + (Math.random() - 0.5) * emitter.velocitySpread);
    }
  }

  for (var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];
    p.step();
    if (p.positionX < 0 ||
        p.positionX >= smash.ParticleSystem2.CANVAS_WIDTH ||
        p.positionY < 0 ||
        p.positionY >= smash.ParticleSystem2.CANVAS_HEIGHT ||
        p.age > p.lifespan) {
      this.deadParticles.push(i);
      p.isDead = true;
    }

    if (smash.ParticleSystem2.DRAWING_ENABLED && !p.isDead) {
      var baseIndex =
          (Math.round(p.positionY) *
              smash.ParticleSystem2.CANVAS_WIDTH +
              Math.round(p.positionX)) * 4;
      this.pixels[baseIndex] = Math.round(p.velocityX * 80);
      this.pixels[baseIndex + 1] = Math.round(p.velocityX * 80);
      this.pixels[baseIndex + 2] = 255 - Math.round(p.age / p.lifespan * 255);
      this.pixels[baseIndex + 3] = 255;
    }
  }

  if (smash.ParticleSystem2.DRAWING_ENABLED) {
    this.context.putImageData(this.imageData, 0, 0);
  }
};

/**
 * @param {!smash.ParticleEmitter} emitter
 */
smash.ParticleSystem2.prototype.addEmitter = function(emitter) {
  this.emitters.push(emitter);
};
