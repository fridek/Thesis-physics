#pragma once

#include <iostream>
#include <algorithm>
#include <vector>
#include "sphere.h"
#include "math.h"

namespace smash {
  class Octree {
    public:
      std::vector<smash::Sphere*>* objects;
      std::vector<smash::Octree*>* childNodes;

      float left;
      float right;
      float top;
      float bottom;
      float near;
      float far;
      int maxDepth;

      Octree(float, float, float, float, float, float, int);
      ~Octree(void);
      
      void split();
      bool hasAnyObjects();
      int getTotalObjectCount();
      int getTotalTreeSize();
      std::vector<int>* getAllOffsets(float, float, float, float, float, float);
      bool sphereLeft(smash::Sphere*);
      void removeSphere(smash::Sphere*);
      void addSphere(smash::Sphere*);
  };
}

