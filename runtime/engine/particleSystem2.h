#pragma once

#include <vector>
#include <stack>
#include <iostream>
#include "particle.h"
#include "particleEmitter.h"

namespace smash {
  class ParticleSystem2 {
    public:
      std::vector<smash::Particle*>* particles;
      std::stack<smash::Particle*>* deadParticles;
      std::vector<smash::ParticleEmitter*>* emitters;

      const static int CANVAS_WIDTH = 1200;
      const static int CANVAS_HEIGHT = 400;

      ParticleSystem2(void);
      ~ParticleSystem2(void);

      void step();
      void addEmitter(smash::ParticleEmitter*);
  };
}

