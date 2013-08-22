/**
 * @fileoverview Sphere collision detection system.
 * @author sebastian.poreba@gmail.com (Sebastian Poręba)
 */

goog.provide('smash.SphereSystem');

goog.require('smash.Sphere');



/**
 * @constructor
 */
smash.SphereSystem = function() {
  var generalVelocity = 1;
  /**
   * @type {!Array.<!smash.Sphere>}
   */
  this.spheres = new Array(smash.SphereSystem.SPHERES_COUNT);
  for (var i = 0; i < smash.SphereSystem.SPHERES_COUNT; i++) {
    var sphere = new smash.Sphere();
    sphere.positionX = (Math.random() - 0.5) * 400;
    sphere.positionY = (Math.random() - 0.5) * 200;
    sphere.positionZ = (Math.random() - 0.5) * 100;
    sphere.velocityX = (Math.random() - 0.5) * generalVelocity;
    sphere.velocityY = (Math.random() - 0.5) * generalVelocity;
    sphere.velocityZ = (Math.random() - 0.5) * generalVelocity;
    this.spheres[i] = sphere;
  }

  if (smash.SphereSystem.DRAWING_ENABLED) {
    /**
     * @type {!THREE.PerspectiveCamera}
     */
    this.camera = new THREE.PerspectiveCamera(20,
        smash.SphereSystem.CANVAS_WIDTH / smash.SphereSystem.CANVAS_HEIGHT,
        1, 10000);
    this.camera.position.z = 600;

    /**
     * @type {!THREE.Scene}
     */
    this.scene = new THREE.Scene();

    var spotLight = new THREE.PointLight(0xffffff);
    spotLight.position.set( -40, 60, -10 );
    this.scene.add( spotLight );


    var material = new THREE.MeshLambertMaterial({
      color: 0xff0000
    });
    /**
     * @type {!Array.<!THREE.SphereGeometry>}
     */
    this.threeSpheres = new Array(smash.SphereSystem.SPHERES_COUNT);
    for (var i = 0; i < smash.SphereSystem.SPHERES_COUNT; i++) {
      var sphere = new THREE.SphereGeometry(this.spheres[i].radius, 10, 10);
      var mesh = new THREE.Mesh(sphere, material);
      mesh.position.x = this.spheres[i].positionX;
      mesh.position.y = this.spheres[i].positionY;
      mesh.position.z = this.spheres[i].positionZ;
      this.threeSpheres[i] = mesh;

      this.scene.add(mesh);
    }



    /**
     * @type {!THREE.WebGLRenderer}
     */
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(smash.SphereSystem.CANVAS_WIDTH,
        smash.SphereSystem.CANVAS_HEIGHT);
    document.body.appendChild(this.renderer.domElement);
    this.renderer.render(this.scene, this.camera);
  }
};


/**
 * @const {number}
 */
smash.SphereSystem.SPHERES_COUNT = 1000;


/**
 * @const {boolean}
 */
smash.SphereSystem.DRAWING_ENABLED = true;


/**
 * @const {number}
 */
smash.SphereSystem.CANVAS_WIDTH = 1200;


/**
 * @const {number}
 */
smash.SphereSystem.CANVAS_HEIGHT = 400;


/**
 * @param {number} x
 * @return {number}
 */
smash.SphereSystem.square = function(x) {
  return x*x;
};

/**
 * @param {number} x1
 * @param {number} y1
 * @param {number} z1
 * @param {number} x2
 * @param {number} y2
 * @param {number} z2
 * @return {number}
 */
smash.SphereSystem.vectorDistance = function(x1, y1, z1, x2, y2, z2) {
  return Math.sqrt(smash.SphereSystem.square(x1 - x2) +
      smash.SphereSystem.square(y1 - y2) +
      smash.SphereSystem.square(z1 - z2));
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {number}
 */
smash.SphereSystem.vectorLength = function(x, y, z) {
  return Math.sqrt(smash.SphereSystem.square(x) +
      smash.SphereSystem.square(y) +
      smash.SphereSystem.square(z));
};

/**
 * @param {!smash.Sphere} sphere1
 * @param {!smash.Sphere} sphere2
 * @return {boolean}
 */
smash.SphereSystem.checkColliding = function(sphere1, sphere2) {
  return smash.SphereSystem.vectorDistance(
      sphere1.positionX, sphere1.positionY, sphere1.positionZ,
      sphere2.positionX, sphere2.positionY, sphere2.positionZ) <
      sphere1.radius + sphere2.radius;
};

/**
 * @param {!smash.Sphere} sphere1
 * @param {!smash.Sphere} sphere2
 */
smash.SphereSystem.collide = function(sphere1, sphere2) {
  var sumVelocitiesLength = smash.SphereSystem.vectorLength(
      sphere1.velocityX, sphere1.velocityY, sphere1.velocityZ) +
      smash.SphereSystem.vectorLength(
          sphere2.velocityX, sphere2.velocityY, sphere2.velocityZ);

  var centerDiffX = sphere1.positionX - sphere2.positionX;
  var centerDiffY = sphere1.positionY - sphere2.positionY;
  var centerDiffZ = sphere1.positionZ - sphere2.positionZ;
  var centerLength = smash.SphereSystem.vectorLength(
      centerDiffX, centerDiffY, centerDiffZ);
  var velocityAdjust = centerLength * sumVelocitiesLength / 2;
  centerDiffX /= velocityAdjust;
  centerDiffY /= velocityAdjust;
  centerDiffZ /= velocityAdjust;

  sphere1.velocityX = centerDiffX;
  sphere1.velocityY = centerDiffY;
  sphere1.velocityZ = centerDiffZ;
  sphere2.velocityX = centerDiffX * -1;
  sphere2.velocityY = centerDiffY * -1;
  sphere2.velocityZ = centerDiffZ * -1;
};


smash.SphereSystem.prototype.step = function() {
  for (var i = 0; i < smash.SphereSystem.SPHERES_COUNT; i++) {
    this.spheres[i].step(1);
    for (var j = 0; j < smash.SphereSystem.SPHERES_COUNT; j++) {
      if (i != j &&
          smash.SphereSystem.checkColliding(this.spheres[i], this.spheres[j])) {
        smash.SphereSystem.collide(this.spheres[i], this.spheres[j]);
      }
    }

    this.threeSpheres[i].position.x = this.spheres[i].positionX;
    this.threeSpheres[i].position.y = this.spheres[i].positionY;
    this.threeSpheres[i].position.z = this.spheres[i].positionZ;
  }
  this.renderer.render(this.scene, this.camera);
};
