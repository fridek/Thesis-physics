/**
 * @fileoverview Sphere collision detection system.
 * @author sebastian.poreba@gmail.com (Sebastian Poręba)
 */

#include "sphereSystem.h"

smash::SphereSystem::SphereSystem() {
  this->spheres = new std::vector<smash::Sphere*>;
  collisions = 0;
  
  float generalVelocity = 1;
    for (int i = 0; i < smash::SphereSystem::SPHERES_COUNT; i++) {
    smash::Sphere* sphere = new smash::Sphere();
    sphere->positionX = (((float) rand() / (RAND_MAX)) - 0.5) * 400;
    sphere->positionY = (((float) rand() / (RAND_MAX)) - 0.5) * 200;
    sphere->positionZ = (((float) rand() / (RAND_MAX)) - 0.5) * 100;
    sphere->velocityX = (((float) rand() / (RAND_MAX)) - 0.5) * generalVelocity;
    sphere->velocityY = (((float) rand() / (RAND_MAX)) - 0.5) * generalVelocity;
    sphere->velocityZ = (((float) rand() / (RAND_MAX)) - 0.5) * generalVelocity;
    this->spheres->push_back(sphere);
  }
};


smash::SphereSystem::~SphereSystem() {
  this->spheres->erase(this->spheres->begin(), this->spheres->end());
  delete this->spheres;
};


/**
 * @param {smash::Sphere*} sphere1
 * @param {smash::Sphere*} sphere2
 */
void smash::SphereSystem::collide(smash::Sphere* sphere1, smash::Sphere* sphere2) {
  float sumVelocitiesLength = smash::math::vectorLength(
      sphere1->velocityX, sphere1->velocityY, sphere1->velocityZ) +
      smash::math::vectorLength(
          sphere2->velocityX, sphere2->velocityY, sphere2->velocityZ);

  float centerDiffX = sphere1->positionX - sphere2->positionX;
  float centerDiffY = sphere1->positionY - sphere2->positionY;
  float centerDiffZ = sphere1->positionZ - sphere2->positionZ;
  float centerLength = smash::math::vectorLength(
      centerDiffX, centerDiffY, centerDiffZ);
  float velocityAdjust = centerLength * sumVelocitiesLength / 2;
  centerDiffX /= velocityAdjust;
  centerDiffY /= velocityAdjust;
  centerDiffZ /= velocityAdjust;

  sphere1->velocityX = centerDiffX;
  sphere1->velocityY = centerDiffY;
  sphere1->velocityZ = centerDiffZ;
  sphere2->velocityX = centerDiffX * -1;
  sphere2->velocityY = centerDiffY * -1;
  sphere2->velocityZ = centerDiffZ * -1;
};

void smash::SphereSystem::applyGravity(smash::Sphere* sphere) {
  if (smash::SphereSystem::GRAVITY_ENABLED) {
    sphere->velocityY -= smash::SphereSystem::GRAVITY_FORCE;
  }
};


void smash::SphereSystem::applyFloor(smash::Sphere* sphere) {
  if (sphere->positionY - sphere->radius <
      smash::SphereSystem::FLOOR_LEVEL) {
    sphere->velocityY *= -smash::SphereSystem::FLOOR_FRICTON;
  }
};


void smash::SphereSystem::step() {
  for (std::vector<smash::Sphere*>::iterator it = this->spheres->begin(); it != this->spheres->end(); it++) {
    smash::Sphere* s = *it;
    applyGravity(s);
    applyFloor(s);


    s->step(1);
    for (std::vector<smash::Sphere*>::iterator it2 = this->spheres->begin(); it2 != this->spheres->end(); it2++) {
      smash::Sphere* s2 = *it2;
      if (s != s2 &&
          smash::math::checkCollidingSpheres(s, s2)) {
        this->collisions++;
        smash::SphereSystem::collide(s, s2);
      }
    }
  }
};

