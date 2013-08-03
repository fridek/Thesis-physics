/**
 * @fileoverview Particle system.
 * @author sebastian.poreba@gmail.com (Sebastian Poręba)
 */

goog.provide('smash.ParticleSystem');

goog.require('smash.Particle');
goog.require('smash.ParticleEmitter');

/**
 * @constructor
 */
smash.ParticleSystem = function() {
  /**
   * @type {!Array.<smash.Particle>}
   */
  this.particles = [];

  /**
   * @type {!Array.<smash.ParticleEmitter>}
   */
  this.emitters = [];

  /**
   * @type {number}
   */
  this.lastStepTime = Date.now();

  if (smash.ParticleSystem.DRAWING_ENABLED) {
    /**
     * @type {!Element}
     */
    this.canvas = window.document.createElement("canvas");
    this.canvas.width = smash.ParticleSystem.CANVAS_WIDTH;
    this.canvas.height = smash.ParticleSystem.CANVAS_HEIGHT;
    window.document.body.appendChild(this.canvas);

    /**
     * @type {!CanvasRenderingContext2D}
     */
    this.context = this.canvas.getContext('2d');

    /**
     * @type {!ImageData}
     */
    this.imageData = this.context.getImageData(0, 0,
        smash.ParticleSystem.CANVAS_WIDTH, smash.ParticleSystem.CANVAS_HEIGHT);

    /**
     * @type {!CanvasPixelArray}
     */
    this.pixels = this.imageData.data;
  }
};

/**
 * @const {boolean}
 */
smash.ParticleSystem.DRAWING_ENABLED = false;

/**
 * @const {number}
 */
smash.ParticleSystem.CANVAS_WIDTH = 1200;

/**
 * @const {number}
 */
smash.ParticleSystem.CANVAS_HEIGHT = 400;


smash.ParticleSystem.prototype.step = function() {
  var timeDelta = Date.now() - this.lastStepTime;
  this.lastStepTime += timeDelta;
  if (smash.ParticleSystem.DRAWING_ENABLED) {
    for (var i = 0; i < smash.ParticleSystem.CANVAS_WIDTH *
        smash.ParticleSystem.CANVAS_HEIGHT * 4; i+=4) {
      this.pixels[i] = 0;
      this.pixels[i + 1] = 0;
      this.pixels[i + 2] = 0;
      this.pixels[i + 3] = 0;
    }
  }

  timeDelta *= 0.001;

  this.emitters.forEach(function(emitter) {
    this.particles.push.apply(this.particles,
        emitter.getNewParticles());
  }, this);

  var newParticles = [];
  this.particles.forEach(function(p) {
    p.step(timeDelta);
    if (p.positionX >= 0 &&
        p.positionX < smash.ParticleSystem.CANVAS_WIDTH &&
        p.positionY >= 0 &&
        p.positionY < smash.ParticleSystem.CANVAS_HEIGHT &&
        p.age < p.lifespan) {
      newParticles.push(p);
    }

    if (smash.ParticleSystem.DRAWING_ENABLED) {
      var baseIndex =
          (Math.round(p.positionY) *
              smash.ParticleSystem.CANVAS_WIDTH +
              Math.round(p.positionX)) * 4;
      this.pixels[baseIndex] = 255;
      this.pixels[baseIndex + 1] = 0;
      this.pixels[baseIndex + 2] = 0;
      this.pixels[baseIndex + 3] = 255;
    }
  }, this);
  if (smash.ParticleSystem.DRAWING_ENABLED) {
    this.context.putImageData(this.imageData, 0, 0);
  }

  this.particles = newParticles;

};

/**
 * @param {!smash.ParticleEmitter} emitter
 */
smash.ParticleSystem.prototype.addEmitter = function(emitter) {
  this.emitters.push(emitter);
};
