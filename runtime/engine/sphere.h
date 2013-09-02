#pragma once

#include <iostream>
#include <tr1/memory>

namespace smash {
	class Sphere {
	  public:
	    typedef std::tr1::shared_ptr<Sphere> pointer;
	    
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


