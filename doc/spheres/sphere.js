/**
 * @fileoverview Sphere file.
 * @author sebastian.poreba@gmail.com (Sebastian Poręba)
 */


goog.provide('smash.Sphere');



/**
 * @struct
 * @constructor
 */
smash.Sphere = function() {
  /**
   * @type {number}
   */
  this.positionX = 0.1;

  /**
   * @type {number}
   */
  this.positionY = 0.1;

  /**
   * @type {number}
   */
  this.positionZ = 0.1;

  /**
   * @type {number}
   */
  this.velocityX = 0.1;

  /**
   * @type {number}
   */
  this.velocityY = 0.1;

  /**
   * @type {number}
   */
  this.velocityZ = 0.1;

  /**
   * @type {number}
   */
  this.radius = 5.5;

  /**
   * @type {number}
   */
  this.mass = 3.5;
};


/**
 *
 */
smash.Sphere.prototype.step = function(stepTime) {
  this.positionX += this.velocityX * stepTime;
  this.positionY += this.velocityY * stepTime;
  this.positionZ += this.velocityZ * stepTime;
};
