#pragma once

#include <vector>
#include <stdlib.h>
#include "sphere.h"
#include "math.h"

namespace smash {
  class SphereSystem {
    public:
      std::vector<smash::Sphere*>* spheres;

      const static int CANVAS_WIDTH = 1200;
      const static int CANVAS_HEIGHT = 400;
      const static int SPHERES_COUNT = 1000;
      const static bool GRAVITY_ENABLED = true;
      const static float GRAVITY_FORCE = 0.1;
      const static float FLOOR_LEVEL = -100;
      const static float FLOOR_FRICTON = 0.8;

      int collisions;

      SphereSystem(void);
      ~SphereSystem(void);
      static void collide(smash::Sphere*, smash::Sphere*);
      void applyGravity(smash::Sphere*);
      void applyFloor(smash::Sphere*);

      void step();
  };
}

