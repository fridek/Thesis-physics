/**
 * @fileoverview Particle system.
 * @author sebastian.poreba@gmail.com (Sebastian Poreba)
 */
#include "particleSystem.h"

smash::ParticleSystem::ParticleSystem() {
  this->particles = new std::vector<smash::Particle*>;
  this->emitters = new std::vector<smash::ParticleEmitter*>;
};

smash::ParticleSystem::~ParticleSystem() {
  this->particles->erase(this->particles->begin(), this->particles->end());
  delete this->particles;
  this->emitters->erase(this->emitters->begin(), this->emitters->end());
  delete this->emitters;
};

void smash::ParticleSystem::step() {
  for (std::vector<smash::ParticleEmitter*>::iterator it = this->emitters->begin(); it != this->emitters->end(); it++) {
    std::vector<smash::Particle*>* particleFromEmitters = (*it)->getNewParticles();
    this->particles->insert(this->particles->end(), particleFromEmitters->begin(), particleFromEmitters->end());
    delete particleFromEmitters;
  }

  std::vector<smash::Particle*> newParticles;

  for (std::vector<smash::Particle*>::iterator it = this->particles->begin(); it != this->particles->end(); it++) {
    smash::Particle* p = *it;
    p->step();
    if (p->positionX >= 0 &&
        p->positionX < smash::ParticleSystem::CANVAS_WIDTH &&
        p->positionY >= 0 &&
        p->positionY < smash::ParticleSystem::CANVAS_HEIGHT &&
        p->age < p->lifespan) {
      newParticles.push_back(p);
    } else {
      delete p;
    }
  };
  this->particles->swap(newParticles);
  newParticles.clear();
};

/**
 * @param emitter
 */
void smash::ParticleSystem::addEmitter(smash::ParticleEmitter* emitter) {
  this->emitters->push_back(emitter);
};
