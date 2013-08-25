/**
 * @fileoverview Octree space partitioning.
 * @author sebastian.poreba@gmail.com (Sebastian Poręba)
 */

smash.Octree = function(left, right, top, bottom, near, far, maxDepth) {
  this.maxDepth = maxDepth;

  this.childNodes_ = [];

  this.left = left;

  this.right = right;

  this.top = top;

  this.bottom = bottom;

  this.near = near;

  this.far = far;

  this.objects_ = [];
};


smash.Octree.prototype.split = function() {
  var middleX = (this.left + this.right) / 2;
  var middleY = (this.top + this.bottom) / 2;
  var middleZ = (this.near + this.far) / 2;
  var maxDepth = this.maxDepth - 1;

  this.childNodes_[0] = new smash.Octree(this.left, middleX, this.top, middleY, this.near, middleZ, maxDepth);
  this.childNodes_[1] = new smash.Octree(middleX, this.right, this.top, middleY, this.near, middleZ, maxDepth);

  this.childNodes_[2] = new smash.Octree(this.left, middleX, middleY, this.bottom, this.near, middleZ, maxDepth);
  this.childNodes_[3] = new smash.Octree(middleX, this.right, middleY, this.bottom, this.near, middleZ, maxDepth);

  this.childNodes_[4] = new smash.Octree(this.left, middleX, this.top, middleY, middleZ, this.far, maxDepth);
  this.childNodes_[5] = new smash.Octree(middleX, this.right, this.top, middleY, middleZ, this.far, maxDepth);

  this.childNodes_[6] = new smash.Octree(this.left, middleX, middleY, this.bottom, middleZ, this.far, maxDepth);
  this.childNodes_[7] = new smash.Octree(middleX, this.right, middleY, this.bottom, middleZ, this.far, maxDepth);
};

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

};


smash.Octree.prototype.addSphere = function(sphere) {
  var left = sphere.positionX - sphere.radius;
  var right = sphere.positionX + sphere.radius;
  var top = sphere.positionY - sphere.radius;
  var bottom = sphere.positionY + sphere.radius;
  var near = sphere.positionZ - sphere.radius;
  var far = sphere.positionZ + sphere.radius;

  if (this.childNodes_.length == 0) {
    this.objects_.push(sphere);
  } else {
    if (this.childNodes_.length == 1) {
      this.split();
    }
    var offsets = this.getAllOffsets(left, right, top, bottom, near, far);

    offsets.forEach(function(offset) {
      this.childNodes_[offset].addSphere(sphere, left, right, top, bottom, near, far);
    }, this);
    this.objects_.push(sphere);
  }
};
