/**
 * @fileoverview Particle object.
 * @author sebastian.poreba@gmail.com (Sebastian Poreba)
 */
#include "particle.h"

smash::Particle::Particle() {
  positionX = 0;
  positionY = 0;
  velocityX = 0;
  velocityY = 0;
  age = 0;
  lifespan = 0;
  isDead = false;
}

/**
 * @param deltaTime
 */
void smash::Particle::step() {
  this->positionX += this->velocityX;
  this->positionY += this->velocityY;
  this->age++;
};


/**
 * Recover defaults.
 */
void smash::Particle::reset() {
  this->positionX = 0;
  this->positionY = 0;
  this->velocityX = 0;
  this->velocityY = 0;
  this->age = 0;
  this->lifespan = 0;
  this->isDead = false;
};
