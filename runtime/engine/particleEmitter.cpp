/**
 * @fileoverview Particle emitter.
 * @author sebastian.poreba@gmail.com (Sebastian Poreba)
 */
#include "particleEmitter.h"

smash::ParticleEmitter::ParticleEmitter() {
  positionX = 0;
  positionY = 0;
  angle = 0;
  velocity = 10;
  velocitySpread = 0.2;
  spread = M_PI * 10 / 180;
  lifespan = 50;
  productionRate = 10;
};


/**
 * @param angle
 */
void smash::ParticleEmitter::setAngle(float angle) {
  this->angle = M_PI * angle / 180;
};


/**
 * @param velocity
 */
void smash::ParticleEmitter::setVelocity(float velocity) {
  this->velocity = velocity;
};


/**
 * @param velocitySpread
 */
void smash::ParticleEmitter::setVelocitySpread(float velocitySpread) {
  this->velocitySpread = velocitySpread;
};


/**
 * @param spread
 */
void smash::ParticleEmitter::setSpread(float spread) {
  this->spread = M_PI * spread / 180;
};


/**
 * @param lifespan
 */
void smash::ParticleEmitter::setLifespan(float lifespan) {
  this->lifespan = lifespan;
};


/**
 * @param rate
 */
void smash::ParticleEmitter::setProductionRate(int rate) {
  this->productionRate = rate;
};


/**
 * @return {!Array.<!smash::Particle>}
 */
std::vector<smash::Particle*>* smash::ParticleEmitter::getNewParticles() {
  std::vector<smash::Particle*> *newParticles = new std::vector<smash::Particle*>;
  for (int i = 0; i < this->productionRate; i++) {
    smash::Particle* p = new smash::Particle();
    p->lifespan = this->lifespan;
    p->positionX = this->positionX;
    p->positionY = this->positionY;
    p->velocityX = sin(this->angle +
        (((float) rand() / (RAND_MAX)) - 0.5) * this->spread) *
        this->velocity *
        (1 + (((float) rand() / (RAND_MAX)) - 0.5) * this->velocitySpread);
    p->velocityY = cos(this->angle +
        (((float) rand() / (RAND_MAX)) - 0.5) * this->spread) *
        this->velocity *
        (1 + (((float) rand() / (RAND_MAX)) - 0.5) * this->velocitySpread);
    newParticles->push_back(p);
  }
  return newParticles;
};
