#include <iostream>
#include "../engine/sphereSystem.h"
#include "../engine/sphere.h"

int main(int argc, char** argv) {
  smash::SphereSystem* system = new smash::SphereSystem();
  for (int i = 0; i < 1000; i++) {
    system->step();
  }
  delete system;
  return 0;
}

