/**
 * @fileoverview Spheres test.
 * @author sebastian.poreba@gmail.com (Sebastian Poręba)
 */

goog.require('smash.SphereSystem');
goog.require('smash.flags');

var system = new smash.SphereSystem();

if (smash.flags.DRAWING_ENABLED) {
  window.addEventListener('load', function() {
    var step = function() {
      system.step();
      window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, true);
} else {
  for (var i = 0; i < 1000; i++) {
    system.step();
  }
  print(system.collisions);
}
