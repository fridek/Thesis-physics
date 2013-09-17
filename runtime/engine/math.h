#pragma once

#include <math.h>
#include "sphere.h"

namespace smash {
	class math {
	  public:
  	  static float square(float);
  	  static float vectorDistance(float, float, float, float, float, float);
  	  static float vectorLength(float, float, float);
  	  static float dot(float, float, float, float, float, float);
  	  static bool checkCollidingSpheres(smash::Sphere*, smash::Sphere*);
	};
};

