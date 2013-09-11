/**
 * @fileoverview Spheres test.
 * @author sebastian.poreba@gmail.com (Sebastian Poręba)
 */

goog.require('smash.SphereSystem2');


var system;
//window.addEventListener('load', function() {
  system = new smash.SphereSystem2();

//  var step = function() {
//    system.step();
//    window.requestAnimationFrame(step);
//  };
//  window.requestAnimationFrame(step);
//}, true);
//
for (var i = 0; i < 10000; i++) {
  system.step();
}
print(system.collisions);
print(system.collisionChecks);
