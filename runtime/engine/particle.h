#pragma once

namespace smash {
	class Particle {
	  public:
      float positionX;
      float positionY;
      float velocityX;
      float velocityY;
      int age;
      int lifespan;
      bool isDead;

      Particle(void);
      ~Particle(void);
      void step();
      void reset();
  };
}


