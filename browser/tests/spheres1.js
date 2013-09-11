/**
 * @fileoverview Spheres test.
 * @author sebastian.poreba@gmail.com (Sebastian Poręba)
 */

goog.require('smash.SphereSystem');

//window.addEventListener('load', function() {
  var system = new smash.SphereSystem();

//  var step = function() {
//    system.step();
//    window.requestAnimationFrame(step);
//  };
//  window.requestAnimationFrame(step);
//}, true);
//
for (var i = 0; i < 1000; i++) {
  system.step();
}
print(system.collisions);
