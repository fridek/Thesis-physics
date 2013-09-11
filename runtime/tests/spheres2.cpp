#include <iostream>
#include <stdio.h>
#include "../engine/sphereSystem2.h"
#include "../engine/sphere.h"

int main(int argc, char** argv) {
  int frames = 10000;
  // sscanf (argv[1],"%d",&frames);
  
  smash::SphereSystem2* system = new smash::SphereSystem2();
  for (int i = 0; i < frames; i++) {
/*
    std::cout << "step " << i << std::endl;
    std::cout << "total object count: " << system->octreeRoot->getTotalObjectCount() << std::endl;
    std::cout << "total tree size: " << system->octreeRoot->getTotalTreeSize() << std::endl;
    std::cout << "collisions: " << system->collisions << std::endl;
    std::cout << "collision checks: " << system->collisionChecks << std::endl;
*/
    system->step();
  }
  std::cout << system->collisions << std::endl;
  std::cout << system->collisionChecks << std::endl;
  delete system;
  return 0;
}

