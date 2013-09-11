/**
 * @fileoverview Sphere collision detection system.
 * @author sebastian.poreba@gmail.com (Sebastian Poręba)
 */

#include "sphereSystem2.h"

smash::SphereSystem2::SphereSystem2() {
  this->spheres = new std::vector<smash::Sphere*>;
  collisions = 0;
  collisionChecks = 0;

  octreeRoot = new smash::Octree(-1000, 1000, -1000, 1000,
      -1000, 1000, smash::SphereSystem2::OCTREE_DEPTH);

  float generalVelocity = 1;
  for (int i = 0; i < smash::SphereSystem2::SPHERES_COUNT; i++) {
    smash::Sphere* sphere = new smash::Sphere();
    sphere->positionX = (((float) rand() / (RAND_MAX)) - 0.5) * 400;
    sphere->positionY = (((float) rand() / (RAND_MAX)) - 0.5) * 200;
    sphere->positionZ = (((float) rand() / (RAND_MAX)) - 0.5) * 100;
    sphere->velocityX = (((float) rand() / (RAND_MAX)) - 0.5) * generalVelocity;
    sphere->velocityY = (((float) rand() / (RAND_MAX)) - 0.5) * generalVelocity;
    sphere->velocityZ = (((float) rand() / (RAND_MAX)) - 0.5) * generalVelocity;
    this->spheres->push_back(sphere);
    this->octreeRoot->addSphere(sphere);
  }
};


smash::SphereSystem2::~SphereSystem2() {
  this->spheres->clear();
  delete this->spheres;
  delete this->octreeRoot;
};


/**
 * @param {smash::Sphere*} sphere1
 * @param {smash::Sphere*} sphere2
 */
void smash::SphereSystem2::collide(smash::Sphere* sphere1, smash::Sphere* sphere2) {
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

void smash::SphereSystem2::applyGravity(smash::Sphere* sphere) {
  if (smash::SphereSystem2::GRAVITY_ENABLED) {
    sphere->velocityY -= smash::SphereSystem2::GRAVITY_FORCE;
  }
};


void smash::SphereSystem2::applyFloor(smash::Sphere* sphere) {
  if (sphere->positionY - sphere->radius <
      smash::SphereSystem2::FLOOR_LEVEL) {
    sphere->velocityY *= -smash::SphereSystem2::FLOOR_FRICTON;
  }
};


void smash::SphereSystem2::collideFromOctree(smash::Octree *node) {
  for (std::vector<smash::Sphere*>::iterator it = node->objects->begin(); it != node->objects->end(); it++) {
    for (std::vector<smash::Sphere*>::iterator it2 = node->objects->begin(); it2 != node->objects->end(); it2++) {
      this->collisionChecks++;
      smash::Sphere* s = *it;
      smash::Sphere* s2 = *it2;
      if (s != s2 &&
          smash::math::checkCollidingSpheres(s, s2)) {
        this->collisions++;
        smash::SphereSystem2::collide(s, s2);
      }
    }
  }
  for (std::vector<smash::Octree*>::iterator it = node->childNodes->begin(); it != node->childNodes->end(); it++) {
    this->collideFromOctree(*it);
  }
};

void smash::SphereSystem2::stepOctree(smash::Octree *node) {
  std::vector<smash::Sphere*> removedSpheres;
  
  for (std::vector<smash::Sphere*>::iterator it = node->objects->begin(); it != node->objects->end(); it++) {
    smash::Sphere* s = *it;
    if (node->sphereLeft(s)) {
      removedSpheres.push_back(s);
      it = node->objects->erase(it);
      if (s == *it) {
        break; // last element removal
      }
    }
  }

  for (std::vector<smash::Octree*>::iterator it = node->childNodes->begin(); it != node->childNodes->end(); it++) {
    this->stepOctree(*it);
  }

  if (node != this->octreeRoot) {
    for (std::vector<smash::Sphere*>::iterator it = removedSpheres.begin(); it != removedSpheres.end(); it++) {
      this->octreeRoot->addSphere(*it);
    }
  }

  if (!node->hasAnyObjects()) {
    for (std::vector<smash::Octree*>::iterator it = node->childNodes->begin(); it != node->childNodes->end(); it++) {
      delete *it;
    }
    node->childNodes->clear();
  }
};


void smash::SphereSystem2::step() {
  this->stepOctree(this->octreeRoot);
  this->collideFromOctree(this->octreeRoot);
  for (std::vector<smash::Sphere*>::iterator it = this->spheres->begin(); it != this->spheres->end(); it++) {
    smash::Sphere* s = *it;
    applyGravity(s);
    applyFloor(s);
    s->step(1);
  }
};

