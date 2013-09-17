/**
 * @fileoverview Spheres test.
 * @author sebastian.poreba@gmail.com (Sebastian Poręba)
 */

goog.require('smash.SphereSystem2');
goog.require('smash.flags');


var system = new smash.SphereSystem2();

if (smash.flags.DRAWING_ENABLED) {
  window.addEventListener('load', function() {
    var step = function() {
      system.step();
      window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, true);
} else {
  for (var i = 0; i < 10000; i++) {
    system.step();
  }
  print(system.collisions);
  print(system.collisionChecks);
}


