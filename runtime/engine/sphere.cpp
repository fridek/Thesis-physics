/**
 * @fileoverview Sphere file.
 * @author sebastian.poreba@gmail.com (Sebastian Poreba)
 */

#include "sphere.h"

smash::Sphere::Sphere() {
  positionX = 0;
  positionY = 0;
  positionZ = 0;
  velocityX = 0;
  velocityY = 0;
  velocityZ = 0;
  radius = 5.5;
  mass = 3.5;
};

/**
 * @param stepTime
 */
void smash::Sphere::step(float stepTime) {
  this->positionX += this->velocityX * stepTime;
  this->positionY += this->velocityY * stepTime;
  this->positionZ += this->velocityZ * stepTime;
};

