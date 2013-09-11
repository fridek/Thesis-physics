#pragma once

#include <iostream>

namespace smash {
	class Sphere {
	  public:
	    
      float positionX;
      float positionY;
      float positionZ;
      float velocityX;
      float velocityY;
      float velocityZ;
      float radius;

      Sphere(void);
      ~Sphere(void);
      void step(float);
  };
}


