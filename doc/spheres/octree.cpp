/**
 * @fileoverview Octree space partitioning.
 * @author sebastian.poreba@gmail.com (Sebastian Poreba)
 */

#include "octree.h"


smash::Octree::Octree(float left, float right,
    float top, float bottom,
    float near, float far,
    int maxDepth) {
  this->maxDepth = maxDepth;
  this->childNodes = new std::vector<smash::Octree*>;
  this->left = left;
  this->right = right;
  this->top = top;
  this->bottom = bottom;
  this->near = near;
  this->far = far;
  this->objects = new std::vector<smash::Sphere*>;
};

smash::Octree::~Octree() {
  delete this->objects;
  for (std::vector<smash::Octree*>::iterator it = this->childNodes->begin(); it != this->childNodes->end(); it++) {
    delete *it;
  }
  delete this->childNodes;
}

/**
 *
 */
void smash::Octree::split() {
  float middleX = (this->left + this->right) / 2;
  float middleY = (this->top + this->bottom) / 2;
  float middleZ = (this->near + this->far) / 2;
  int maxDepth = this->maxDepth - 1;

  this->childNodes->push_back(new smash::Octree(this->left, middleX, this->top, middleY, this->near, middleZ, maxDepth));
  this->childNodes->push_back(new smash::Octree(middleX, this->right, this->top, middleY, this->near, middleZ, maxDepth));

  this->childNodes->push_back(new smash::Octree(this->left, middleX, middleY, this->bottom, this->near, middleZ, maxDepth));
  this->childNodes->push_back(new smash::Octree(middleX, this->right, middleY, this->bottom, this->near, middleZ, maxDepth));

  this->childNodes->push_back(new smash::Octree(this->left, middleX, this->top, middleY, middleZ, this->far, maxDepth));
  this->childNodes->push_back(new smash::Octree(middleX, this->right, this->top, middleY, middleZ, this->far, maxDepth));

  this->childNodes->push_back(new smash::Octree(this->left, middleX, middleY, this->bottom, middleZ, this->far, maxDepth));
  this->childNodes->push_back(new smash::Octree(middleX, this->right, middleY, this->bottom, middleZ, this->far, maxDepth));
};

bool smash::Octree::hasAnyObjects() {
  if (this->objects->size() > 0) {
    return true;
  }

  for (std::vector<smash::Octree*>::iterator it = this->childNodes->begin(); it != this->childNodes->end(); it++) {
    if ((*it)->hasAnyObjects()) {
      return true;
    }
  }
  return false;
};


int smash::Octree::getTotalObjectCount() {
  int count = this->objects->size();

  for (std::vector<smash::Octree*>::iterator it = this->childNodes->begin(); it != this->childNodes->end(); it++) {
    count += (*it)->getTotalObjectCount();
  }
  return count;
};


int smash::Octree::getTotalTreeSize() {
  int count = this->childNodes->size();
  for (std::vector<smash::Octree*>::iterator it = this->childNodes->begin(); it != this->childNodes->end(); it++) {
    count += (*it)->getTotalTreeSize();
  }
  return count;
};



std::vector<int>* smash::Octree::getAllOffsets(float left, float right, float top, float bottom, float near, float far) {
  float middleX = (this->left + this->right) / 2;
  float middleY = (this->top + this->bottom) / 2;
  float middleZ = (this->near + this->far) / 2;

  float offset = 0;
  bool bothX = false, bothY = false, bothZ = false;

  if (left < middleX && right < middleX) {
    offset += 0;
  } else if (left > middleX && right > middleX) {
    offset += 1;
  } else {
    bothX = true;
  }

  if (top < middleY && bottom < middleY) {
    offset += 0;
  } else if (top > middleY && bottom > middleY) {
    offset += 2;
  } else {
    bothY = true;
  }

  if (near < middleZ && far < middleZ) {
    offset += 0;
  } else if (near > middleZ && far > middleZ) {
    offset += 4;
  } else {
    bothZ = true;
  }

  std::vector<int>* allOffsets = new std::vector<int>;
  allOffsets->push_back(offset);
  
  if (bothZ) {
    for (std::vector<int>::iterator it = allOffsets->begin(),
        itEnd = allOffsets->end(); it != itEnd; it++) {
      int n = *it;
      allOffsets->push_back(n + 4);
    }
  }
  if (bothY) {
    for (std::vector<int>::iterator it = allOffsets->begin(),
        itEnd = allOffsets->end(); it != itEnd; it++) {
      int n = *it;
      allOffsets->push_back(n + 2);
    }
  }
  if (bothX) {
    for (std::vector<int>::iterator it = allOffsets->begin(),
        itEnd = allOffsets->end(); it != itEnd; it++) {
      int n = *it;
      allOffsets->push_back(n + 1);
    }
  }
  /*
  if (allOffsets->size() > 1) {
    std::cout << "offsets ";
    for (std::vector<int>::iterator it = allOffsets->begin(),
        itEnd = allOffsets->end(); it != itEnd; it++) {
          std::cout << *it << " ";
        }
        std::cout << std::endl;
      }*/
  return allOffsets;
};

bool smash::Octree::sphereLeft(smash::Sphere *sphere) {
  return (sphere->positionX + sphere->radius < this->left ||
      sphere->positionX - sphere->radius > this->right ||
      sphere->positionY + sphere->radius < this->top ||
      sphere->positionY - sphere->radius > this->bottom ||
      sphere->positionZ + sphere->radius < this->near ||
      sphere->positionZ - sphere->radius > this->far);
};


void smash::Octree::removeSphere(smash::Sphere *sphere) {
  this->objects->erase(std::remove(this->objects->begin(), this->objects->end(), sphere));
};


void smash::Octree::addSphere(smash::Sphere *sphere) {
  if (std::find(this->objects->begin(), this->objects->end(), sphere) !=
        this->objects->end()) {
    return; // this happens when sphere is re-added from two
    // different nodes after removal.
  }

  float left = sphere->positionX - sphere->radius;
  float right = sphere->positionX + sphere->radius;
  float top = sphere->positionY - sphere->radius;
  float bottom = sphere->positionY + sphere->radius;
  float near = sphere->positionZ - sphere->radius;
  float far = sphere->positionZ + sphere->radius;

  if (this->maxDepth == 0 || this->objects->size() == 0) {
    this->objects->push_back(sphere);
  } else {
    if (this->childNodes->size() == 0) {
      this->split();
    }
    std::vector<int> *offsets = this->getAllOffsets(left, right, top, bottom, near, far);
    for (std::vector<int>::iterator it = offsets->begin(); it != offsets->end(); it++) {
      int offset = *it;
      if (offset > 8) {
        // weird offset, investigate
        continue;
      }
      this->childNodes->at(offset)->addSphere(sphere);
    }
    offsets->clear();
    delete offsets;
  }
};

