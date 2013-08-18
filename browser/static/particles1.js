function c() {
  this.velocityY = this.velocityX = this.b = this.a = 0.1;
  this.c = this.k = 0;
  this.l = !1
}
c.prototype.step = function() {
  this.a += this.velocityX;
  this.b += this.velocityY;
  this.k++
};
function e() {
  this.g = this.b = this.a = 0.1;
  this.f = 10.1;
  this.j = 0.2;
  this.e = 10 * Math.PI / 180;
  this.c = 50;
  this.i = 10
}
function f(a) {
  for(var b = [], k = 0;k < a.i;k++) {
    var d = new c;
    d.c = a.c;
    d.a = a.a;
    d.b = a.b;
    d.velocityX = Math.sin(a.g + (Math.random() - 0.5) * a.e) * a.f * a.j;
    d.velocityY = Math.cos(a.g + (Math.random() - 0.5) * a.e) * a.f * (1 + (Math.random() - 0.5) * a.j);
    b.push(d)
  }
  return b
}
;function g() {
  this.d = [];
  this.h = []
}
g.prototype.step = function() {
  this.h.forEach(function(a) {
    this.d.push.apply(this.d, f(a))
  }, this);
  var a = [];
  this.d.forEach(function(b) {
    b.step();
    0 <= b.a && (1200 > b.a && 0 <= b.b && 400 > b.b && b.k < b.c) && a.push(b)
  }, this);
  this.d = a
};
var h = new g, l = new e;
l.a = 600;
l.b = 100;
l.f = 3;
l.e = 30 * Math.PI / 180;
l.i = 1E3;
h.h.push(l);
var m = new e;
m.a = 200;
m.b = 300;
m.f = 1;
m.j = 0.75;
m.e = 60 * Math.PI / 180;
m.c = 100;
m.g = 90 * Math.PI / 180;
m.i = 1E3;
h.h.push(m);
for(var n = 0;1E3 > n;n++) {
  h.step()
}
;
