#pragma once

#include <iostream>
#include <vector>
#include <stdlib.h>
#include "sphere.h"
#include "math.h"
#include "octree.h"

namespace smash {
  class SphereSystem2 {
    public:
      std::vector<smash::Sphere*>* spheres;
      smash::Octree* octreeRoot;

      const static int CANVAS_WIDTH = 1200;
      const static int CANVAS_HEIGHT = 400;
      const static int SPHERES_COUNT = 1000;
      const static bool GRAVITY_ENABLED = true;
      const static float GRAVITY_FORCE = 0.1;
      const static float FLOOR_LEVEL = -100;
      const static float FLOOR_FRICTON = 0.8;
      const static int OCTREE_DEPTH = 5;

      int collisions;
      int collisionChecks;

      SphereSystem2(void);
      ~SphereSystem2(void);
      static void collide(smash::Sphere*, smash::Sphere*);
      void applyGravity(smash::Sphere*);
      void applyFloor(smash::Sphere*);
      
      void collideFromOctree(smash::Octree*);
      void stepOctree(smash::Octree*);

      void step();
  };
};

