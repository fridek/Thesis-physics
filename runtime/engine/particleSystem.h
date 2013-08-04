#pragma once

#include <vector>
#include "particle.h"
#include "particleEmitter.h"

namespace smash {
  class ParticleSystem {
    public:
      std::vector<smash::Particle*>* particles;
      std::vector<smash::ParticleEmitter*>* emitters;
      
      const static int CANVAS_WIDTH = 1200;
      const static int CANVAS_HEIGHT = 400;
      
      ParticleSystem(void);
      ~ParticleSystem(void);
      
      void step();
      void addEmitter(smash::ParticleEmitter*);
  };
}

