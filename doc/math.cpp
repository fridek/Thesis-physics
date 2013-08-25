
#include "math.h"

/**
 * @param {number} x
 * @return {number}
 */
float smash::math::square(float x) {
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
float smash::math::vectorDistance(float x1, float y1, float z1, float x2, float y2, float z2) {
  return sqrt(smash::math::square(x1 - x2) +
      smash::math::square(y1 - y2) +
      smash::math::square(z1 - z2));
};


/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {number}
 */
float smash::math::vectorLength(float x, float y, float z) {
  return sqrt(smash::math::square(x) +
      smash::math::square(y) +
      smash::math::square(z));
};


/**
 * @param {!smash.Sphere} sphere1
 * @param {!smash.Sphere} sphere2
 * @return {boolean}
 */
bool smash::math::checkCollidingSpheres(smash::Sphere* sphere1, smash::Sphere* sphere2) {
  return smash::math::vectorDistance(
      sphere1->positionX, sphere1->positionY, sphere1->positionZ,
      sphere2->positionX, sphere2->positionY, sphere2->positionZ) <
      sphere1->radius + sphere2->radius;
};

