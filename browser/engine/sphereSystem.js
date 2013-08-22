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
  var generalVelocity = 5;
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

smash.SphereSystem.square = function(x) {
  return x*x;
};


smash.SphereSystem.prototype.step = function() {
  var sq = smash.SphereSystem.square;

  for (var i = 0; i < smash.SphereSystem.SPHERES_COUNT; i++) {
    this.spheres[i].step(1);
    for (var j = 0; j < smash.SphereSystem.SPHERES_COUNT; j++) {
      if (i != j && Math.sqrt(
          sq(this.spheres[i].positionX - this.spheres[j].positionX) +
          sq(this.spheres[i].positionY - this.spheres[j].positionY) +
          sq(this.spheres[i].positionZ - this.spheres[j].positionZ)
      ) < this.spheres[i].radius + this.spheres[j].radius) {
        this.spheres[i].velocityX *= -1;
        this.spheres[i].velocityY *= -1;
        this.spheres[i].velocityZ *= -1;
        this.spheres[j].velocityX *= -1;
        this.spheres[j].velocityY *= -1;
        this.spheres[j].velocityZ *= -1;
        this.spheres[i].step(1);
        this.spheres[j].step(1);
      }
    }

    this.threeSpheres[i].position.x = this.spheres[i].positionX;
    this.threeSpheres[i].position.y = this.spheres[i].positionY;
    this.threeSpheres[i].position.z = this.spheres[i].positionZ;
  }
  this.renderer.render(this.scene, this.camera);
};
