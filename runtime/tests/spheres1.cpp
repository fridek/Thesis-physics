#include <iostream>
#include <stdio.h>
#include "../engine/sphereSystem.h"
#include "../engine/sphere.h"

int main(int argc, char** argv) {
  int frames = 1000;
  // sscanf (argv[1],"%d",&frames);
  
  smash::SphereSystem* system = new smash::SphereSystem();
  for (int i = 0; i < frames; i++) {
    system->step();
  }
  std::cout << system->collisions << std::endl;
  delete system;
  return 0;
}

