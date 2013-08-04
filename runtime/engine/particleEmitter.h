#pragma once

#define _USE_MATH_DEFINES

#include <vector>
#include <math.h>
#include <stdlib.h>
#include "particle.h"


namespace smash {
  class ParticleEmitter {
    public:
      float positionX;
      float positionY;
      int angle;
      float velocity;
      float velocitySpread;
      float spread;
      float lifespan;
      int productionRate;
      
      ParticleEmitter(void);
      ~ParticleEmitter(void);
      
      void setAngle(float angle);
      void setVelocity(float velocity);
      void setVelocitySpread(float velocitySpread);
      void setSpread(float spread);
      void setLifespan(float lifespan);
      void setProductionRate(int rate);
      std::vector<smash::Particle*>* getNewParticles();
  };
};

