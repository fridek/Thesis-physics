/**
 * @fileoverview Particle system.
 * @author sebastian.poreba@gmail.com (Sebastian Poreba)
 */
#include "particleSystem2.h"

smash::ParticleSystem2::ParticleSystem2() {
  this->particles = new std::vector<smash::Particle*>;
  this->deadParticles = new std::stack<smash::Particle*>;
  this->emitters = new std::vector<smash::ParticleEmitter*>;
};

smash::ParticleSystem2::~ParticleSystem2() {
  this->particles->erase(this->particles->begin(), this->particles->end());
  delete this->particles;
  while (!this->deadParticles->empty()) {
    delete this->deadParticles->top();
    this->deadParticles->pop();
  }
  delete this->deadParticles;
  this->emitters->erase(this->emitters->begin(), this->emitters->end());
  delete this->emitters;
};

void smash::ParticleSystem2::step() {
  for (std::vector<smash::ParticleEmitter*>::iterator it =
      this->emitters->begin(); it != this->emitters->end(); it++) {
    smash::ParticleEmitter* emitter = *it;
    for (int i = 0; i < emitter->productionRate; i++) {
      smash::Particle* p;
      if (!this->deadParticles->empty()) {
        p = this->deadParticles->top();
        this->deadParticles->pop();
        p->reset();
      } else {
        p = new smash::Particle();
        this->particles->push_back(p);
      }
      
      p->lifespan = emitter->lifespan;
      p->positionX = emitter->positionX;
      p->positionY = emitter->positionY;
      p->velocityX = sin(emitter->angle +
          (((float) rand() / (RAND_MAX)) - 0.5) * emitter->spread) *
          emitter->velocity * 
          (1 + (((float) rand() / (RAND_MAX)) - 0.5) * emitter->velocitySpread);
      p->velocityY = cos(emitter->angle +
          (((float) rand() / (RAND_MAX)) - 0.5) * emitter->spread) *
          emitter->velocity *
          (1 + (((float) rand() / (RAND_MAX)) - 0.5) * emitter->velocitySpread);
    }
  }

  for (std::vector<smash::Particle*>::iterator it = this->particles->begin();
      it != this->particles->end(); it++) {
    smash::Particle* p = *it;
    if (p->isDead) {
      continue;
    }
    p->step();
    if (p->positionX < 0 ||
        p->positionX >= smash::ParticleSystem2::CANVAS_WIDTH ||
        p->positionY < 0 ||
        p->positionY >= smash::ParticleSystem2::CANVAS_HEIGHT ||
        p->age > p->lifespan) {
      this->deadParticles->push(p);
      p->isDead = true;
    }
  };
};

/**
 * @param emitter
 */
void smash::ParticleSystem2::addEmitter(smash::ParticleEmitter* emitter) {
  this->emitters->push_back(emitter);
};
