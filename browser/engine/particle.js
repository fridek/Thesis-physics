/**
 * @fileoverview Particle object.
 * @author sebastian.poreba@gmail.com (Sebastian Poręba)
 */

goog.provide('smash.Particle');

/**
 * @struct
 * @constructor
 */
smash.Particle = function() {
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
  this.velocityX = 0;

  /**
   * @type {number}
   */
  this.velocityY = 0;

  /**
   * @type {number}
   */
  this.age = 0;

  /**
   * In seconds.
   * @type {number}
   */
  this.lifespan = 0;

  /**
   * @type {boolean}
   */
  this.isDead = false;
};

/**
 * @param {number} deltaTime
 */
smash.Particle.prototype.step = function(deltaTime) {
  this.positionX += this.velocityX * deltaTime;
  this.positionY += this.velocityY * deltaTime;
  this.age += deltaTime;
};


/**
 * Recover defaults.
 */
smash.Particle.prototype.reset = function() {
  this.positionX = 0;
  this.positionY = 0;
  this.velocityX = 0;
  this.velocityY = 0;
  this.age = 0;
  this.lifespan = 0;
  this.isDead = false;
};
