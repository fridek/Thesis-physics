/**
 * @fileoverview Octree space partitioning.
 * @author sebastian.poreba@gmail.com (Sebastian Poręba)
 */

goog.provide('smash.Octree');

goog.require('goog.array');


/**
 * @param left
 * @param right
 * @param top
 * @param bottom
 * @param near
 * @param far
 * @param maxDepth
 * @constructor
 */
smash.Octree = function(left, right, top, bottom, near, far, maxDepth) {
  this.maxDepth = maxDepth;

  this.childNodes = [];

  this.left = left;

  this.right = right;

  this.top = top;

  this.bottom = bottom;

  this.near = near;

  this.far = far;

  this.objects = [];
};

/**
 *
 */
smash.Octree.prototype.split = function() {
  var middleX = (this.left + this.right) / 2;
  var middleY = (this.top + this.bottom) / 2;
  var middleZ = (this.near + this.far) / 2;
  var maxDepth = this.maxDepth - 1;

  this.childNodes[0] = new smash.Octree(this.left, middleX, this.top, middleY, this.near, middleZ, maxDepth);
  this.childNodes[1] = new smash.Octree(middleX, this.right, this.top, middleY, this.near, middleZ, maxDepth);

  this.childNodes[2] = new smash.Octree(this.left, middleX, middleY, this.bottom, this.near, middleZ, maxDepth);
  this.childNodes[3] = new smash.Octree(middleX, this.right, middleY, this.bottom, this.near, middleZ, maxDepth);

  this.childNodes[4] = new smash.Octree(this.left, middleX, this.top, middleY, middleZ, this.far, maxDepth);
  this.childNodes[5] = new smash.Octree(middleX, this.right, this.top, middleY, middleZ, this.far, maxDepth);

  this.childNodes[6] = new smash.Octree(this.left, middleX, middleY, this.bottom, middleZ, this.far, maxDepth);
  this.childNodes[7] = new smash.Octree(middleX, this.right, middleY, this.bottom, middleZ, this.far, maxDepth);
};

/**
 *
 * @return {boolean}
 */
smash.Octree.prototype.hasAnyObjects = function() {
  return this.objects.length > 0 ||
      this.childNodes.some(function(node) {
    return node.hasAnyObjects();
  });
};


/**
 *
 * @param left
 * @param right
 * @param top
 * @param bottom
 * @param near
 * @param far
 * @return {Array}
 */
smash.Octree.prototype.getAllOffsets = function(left, right, top, bottom, near, far) {
  var middleX = (this.left + this.right) / 2;
  var middleY = (this.top + this.bottom) / 2;
  var middleZ = (this.near + this.far) / 2;

  var offset = 0;
  var bothX = false, bothY = false, bothZ = false;

  if (left < middleX && right < middleX) {
    offset += 0;
  } else if (left > middleX && right > middleX) {
    offset += 1;
  } else {
    bothX = true;
  }

  if (top < middleY && bottom < middleY) {
    offset += 0;
  } else if (top > middleY && bottom > middleY) {
    offset += 2;
  } else {
    bothY = true;
  }

  if (near < middleZ && far < middleZ) {
    offset += 0;
  } else if (near > middleZ && far > middleZ) {
    offset += 4;
  } else {
    bothZ = true;
  }

  var allOffsets = [offset];
  if (bothZ) {
    for (var i = 0, l = allOffsets.length; i < l; i++) {
      allOffsets.push(allOffsets[i] + 4);
    }
  }
  if (bothY) {
    for (var i = 0, l = allOffsets.length; i < l; i++) {
      allOffsets.push(allOffsets[i] + 2);
    }
  }
  if (bothX) {
    for (var i = 0, l = allOffsets.length; i < l; i++) {
      allOffsets.push(allOffsets[i] + 1);
    }
  }
  return allOffsets;
};


/**
 *
 * @param sphere
 * @return {boolean}
 */
smash.Octree.prototype.sphereLeft = function(sphere) {
  return (sphere.positionX + sphere.radius < this.left ||
      sphere.positionX - sphere.radius > this.right ||
      sphere.positionY + sphere.radius < this.top ||
      sphere.positionY - sphere.radius > this.bottom ||
      sphere.positionZ + sphere.radius < this.near ||
      sphere.positionZ - sphere.radius > this.far);
};


smash.Octree.prototype.removeSphere = function(sphere) {
  goog.array.remove(this.objects, sphere);
};


smash.Octree.prototype.addSphere = function(sphere) {
  if (this.objects.indexOf(sphere) != -1) {
    return; // this happens when sphere is re-added from two
    // different nodes after removal.
  }

  var left = sphere.positionX - sphere.radius;
  var right = sphere.positionX + sphere.radius;
  var top = sphere.positionY - sphere.radius;
  var bottom = sphere.positionY + sphere.radius;
  var near = sphere.positionZ - sphere.radius;
  var far = sphere.positionZ + sphere.radius;

  if (this.maxDepth == 0 || this.objects.length == 0) {
    this.objects.push(sphere);
  } else {
    if (this.childNodes.length == 0) {
      this.split();
    }
    var offsets = this.getAllOffsets(left, right, top, bottom, near, far);
    offsets.forEach(function(offset) {
      this.childNodes[offset].addSphere(sphere);
    }, this);
  }
};

smash.Octree.prototype.log = function() {
  window.console.log('On level ', this.maxDepth,
      ' octree node with', this.objects.length, 'objects');
  this.childNodes.forEach(function(node) {
    node.log();
  });
};
