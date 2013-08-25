/**
 * @fileoverview Math utils.
 * @author sebastian.poreba@gmail.com (Sebastian Poręba)
 */

goog.provide('smash.math');


/**
 * @param {number} x
 * @return {number}
 */
smash.math.square = function(x) {
  return x * x;
};


/**
 * @param {number} x1
 * @param {number} y1
 * @param {number} z1
 * @param {number} x2
 * @param {number} y2
 * @param {number} z2
 * @return {number}
 */
smash.math.vectorDistance = function(x1, y1, z1, x2, y2, z2) {
  return Math.sqrt(smash.math.square(x1 - x2) +
      smash.math.square(y1 - y2) +
      smash.math.square(z1 - z2));
};


/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {number}
 */
smash.math.vectorLength = function(x, y, z) {
  return Math.sqrt(smash.math.square(x) +
      smash.math.square(y) +
      smash.math.square(z));
};


/**
 * @param {!smash.Sphere} sphere1
 * @param {!smash.Sphere} sphere2
 * @return {boolean}
 */
smash.math.checkCollidingSpheres = function(sphere1, sphere2) {
  return smash.math.vectorDistance(
      sphere1.positionX, sphere1.positionY, sphere1.positionZ,
      sphere2.positionX, sphere2.positionY, sphere2.positionZ) <
      sphere1.radius + sphere2.radius;
};
