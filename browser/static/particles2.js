function c() {
  this.velocityY = this.velocityX = this.b = this.a = 0.1;
  this.c = this.h = 0;
  this.m = !1
}
c.prototype.step = function() {
  this.a += this.velocityX;
  this.b += this.velocityY;
  this.h++
};
c.prototype.reset = function() {
  this.c = this.h = this.velocityY = this.velocityX = this.b = this.a = 0;
  this.m = !1
};
function e() {
  this.i = this.b = this.a = 0.1;
  this.g = 10.1;
  this.k = 0.2;
  this.f = 10 * Math.PI / 180;
  this.c = 50;
  this.j = 10
}
;function f() {
  this.e = [];
  this.l = [];
  this.d = []
}
f.prototype.step = function() {
  for(var d, g = 0;g < this.d.length;g++) {
    var b = this.d[g];
    for(d = 0;d < b.j;d++) {
      var a = this.l.pop();
      void 0 !== a ? (a = this.e[a], a.reset()) : (a = new c, this.e.push(a));
      a.c = b.c;
      a.a = b.a;
      a.b = b.b;
      a.velocityX = Math.sin(b.i + (Math.random() - 0.5) * b.f) * b.g * b.k;
      a.velocityY = Math.cos(b.i + (Math.random() - 0.5) * b.f) * b.g * (1 + (Math.random() - 0.5) * b.k)
    }
  }
  for(d = 0;d < this.e.length;d++) {
    if(a = this.e[d], a.step(), 0 > a.a || 1200 <= a.a || 0 > a.b || 400 <= a.b || a.h > a.c) {
      this.l.push(d), a.m = !0
    }
  }
};
var h = new f, k = new e;
k.a = 600;
k.b = 100;
k.g = 3;
k.f = 30 * Math.PI / 180;
k.j = 1E3;
h.d.push(k);
var l = new e;
l.a = 200;
l.b = 300;
l.g = 1;
l.k = 0.75;
l.f = 60 * Math.PI / 180;
l.c = 100;
l.i = 90 * Math.PI / 180;
l.j = 1E3;
h.d.push(l);
for(var m = 0;1E3 > m;m++) {
  h.step()
}
;