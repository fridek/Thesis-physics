/**
 * @fileoverview Particle emitter.
 * @author sebastian.poreba@gmail.com (Sebastian Poręba)
 */

goog.provide('smash.ParticleEmitter');

goog.require('smash.Particle');

/**
 * @constructor
 */
smash.ParticleEmitter = function() {
  /**
   * @type {number}
   */
  this.positionX = 0;

  /**
   * @type {number}
   */
  this.positionY = 0;

  /**
   * @type {number}
   */
  this.angle = 0;

  /**
   * @type {number}
   */
  this.velocity = 10;

  /**
   * @type {number}
   */
  this.velocitySpread = 0.2;

  /**
   * @type {number}
   */
  this.spread = Math.PI * 10 / 180;

  /**
   * In ticks.
   * @type {number}
   */
  this.lifespan = 50;

  /**
   * @type {number}
   */
  this.productionRate = 10;
};


/**
 * @param {number} angle
 */
smash.ParticleEmitter.prototype.setAngle = function(angle) {
  this.angle = Math.PI * angle / 180;
};


/**
 * @param {number} velocity
 */
smash.ParticleEmitter.prototype.setVelocity = function(velocity) {
  this.velocity = velocity;
};


/**
 * @param {number} velocitySpread
 */
smash.ParticleEmitter.prototype.setVelocitySpread = function(velocitySpread) {
  this.velocitySpread = velocitySpread;
};


/**
 * @param {number} spread
 */
smash.ParticleEmitter.prototype.setSpread = function(spread) {
  this.spread = Math.PI * spread / 180;
};


/**
 * @param {number} lifespan
 */
smash.ParticleEmitter.prototype.setLifespan = function(lifespan) {
  this.lifespan = lifespan;
};


/**
 * @param {number} rate
 */
smash.ParticleEmitter.prototype.setProductionRate = function(rate) {
  this.productionRate = rate;
};


/**
 * @return {!Array.<!smash.Particle>}
 */
smash.ParticleEmitter.prototype.getNewParticles = function() {
  var newParticles = [];
  for (var i = 0; i < this.productionRate; i++) {
    var p = new smash.Particle();
    p.lifespan = this.lifespan;
    p.positionX = this.positionX;
    p.positionY = this.positionY;
    p.velocityX = Math.sin(this.angle +
        (Math.random() - 0.5) * this.spread) *
        this.velocity * this.velocitySpread;
    p.velocityY = Math.cos(this.angle +
        (Math.random() - 0.5) * this.spread) *
        this.velocity *
        (1 + (Math.random() - 0.5) * this.velocitySpread);
    newParticles.push(p);
  }
  return newParticles;
};
