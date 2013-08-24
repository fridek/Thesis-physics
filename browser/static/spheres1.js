var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.exportPath_ = function(a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  a[0] in c || !c.execScript || c.execScript("var " + a[0]);
  for(var d;a.length && (d = a.shift());) {
    a.length || void 0 === b ? c = c[d] ? c[d] : c[d] = {} : c[d] = b
  }
};
goog.define = function(a, b) {
  var c = b;
  COMPILED || goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, a) && (c = goog.global.CLOSURE_DEFINES[a]);
  goog.exportPath_(a, c)
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.provide = function(a) {
  if(!COMPILED) {
    if(goog.isProvided_(a)) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    delete goog.implicitNamespaces_[a];
    for(var b = a;(b = b.substring(0, b.lastIndexOf("."))) && !goog.getObjectByName(b);) {
      goog.implicitNamespaces_[b] = !0
    }
  }
  goog.exportPath_(a)
};
goog.setTestOnly = function(a) {
  if(COMPILED && !goog.DEBUG) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + a ? ": " + a : ".");
  }
};
COMPILED || (goog.isProvided_ = function(a) {
  return!goog.implicitNamespaces_[a] && !!goog.getObjectByName(a)
}, goog.implicitNamespaces_ = {});
goog.getObjectByName = function(a, b) {
  for(var c = a.split("."), d = b || goog.global, e;e = c.shift();) {
    if(goog.isDefAndNotNull(d[e])) {
      d = d[e]
    }else {
      return null
    }
  }
  return d
};
goog.globalize = function(a, b) {
  var c = b || goog.global, d;
  for(d in a) {
    c[d] = a[d]
  }
};
goog.addDependency = function(a, b, c) {
  if(goog.DEPENDENCIES_ENABLED) {
    var d;
    a = a.replace(/\\/g, "/");
    for(var e = goog.dependencies_, f = 0;d = b[f];f++) {
      e.nameToPath[d] = a, a in e.pathToNames || (e.pathToNames[a] = {}), e.pathToNames[a][d] = !0
    }
    for(d = 0;b = c[d];d++) {
      a in e.requires || (e.requires[a] = {}), e.requires[a][b] = !0
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function(a) {
  if(!COMPILED && !goog.isProvided_(a)) {
    if(goog.ENABLE_DEBUG_LOADER) {
      var b = goog.getPathFromDeps_(a);
      if(b) {
        goog.included_[b] = !0;
        goog.writeScripts_();
        return
      }
    }
    a = "goog.require could not find: " + a;
    goog.global.console && goog.global.console.error(a);
    throw Error(a);
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(a, b) {
  return a
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.getInstance = function() {
    if(a.instance_) {
      return a.instance_
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    return a.instance_ = new a
  }
};
goog.instantiatedSingletons_ = [];
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.DEPENDENCIES_ENABLED && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function() {
  var a = goog.global.document;
  return"undefined" != typeof a && "write" in a
}, goog.findBasePath_ = function() {
  if(goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH
  }else {
    if(goog.inHtmlDocument_()) {
      for(var a = goog.global.document.getElementsByTagName("script"), b = a.length - 1;0 <= b;--b) {
        var c = a[b].src, d = c.lastIndexOf("?"), d = -1 == d ? c.length : d;
        if("base.js" == c.substr(d - 7, 7)) {
          goog.basePath = c.substr(0, d - 7);
          break
        }
      }
    }
  }
}, goog.importScript_ = function(a) {
  var b = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
  !goog.dependencies_.written[a] && b(a) && (goog.dependencies_.written[a] = !0)
}, goog.writeScriptTag_ = function(a) {
  if(goog.inHtmlDocument_()) {
    var b = goog.global.document;
    if("complete" == b.readyState) {
      if(/\bdeps.js$/.test(a)) {
        return!1
      }
      throw Error('Cannot write "' + a + '" after document load');
    }
    b.write('\x3cscript type\x3d"text/javascript" src\x3d"' + a + '"\x3e\x3c/script\x3e');
    return!0
  }
  return!1
}, goog.writeScripts_ = function() {
  function a(e) {
    if(!(e in d.written)) {
      if(!(e in d.visited) && (d.visited[e] = !0, e in d.requires)) {
        for(var g in d.requires[e]) {
          if(!goog.isProvided_(g)) {
            if(g in d.nameToPath) {
              a(d.nameToPath[g])
            }else {
              throw Error("Undefined nameToPath for " + g);
            }
          }
        }
      }
      e in c || (c[e] = !0, b.push(e))
    }
  }
  var b = [], c = {}, d = goog.dependencies_, e;
  for(e in goog.included_) {
    d.written[e] || a(e)
  }
  for(e = 0;e < b.length;e++) {
    if(b[e]) {
      goog.importScript_(goog.basePath + b[e])
    }else {
      throw Error("Undefined script input");
    }
  }
}, goog.getPathFromDeps_ = function(a) {
  return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function(a) {
  var b = typeof a;
  if("object" == b) {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var c = Object.prototype.toString.call(a);
      if("[object Window]" == c) {
        return"object"
      }
      if("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == b && "undefined" == typeof a.call) {
      return"object"
    }
  }
  return b
};
goog.isDef = function(a) {
  return void 0 !== a
};
goog.isNull = function(a) {
  return null === a
};
goog.isDefAndNotNull = function(a) {
  return null != a
};
goog.isArray = function(a) {
  return"array" == goog.typeOf(a)
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return"array" == b || "object" == b && "number" == typeof a.length
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear
};
goog.isString = function(a) {
  return"string" == typeof a
};
goog.isBoolean = function(a) {
  return"boolean" == typeof a
};
goog.isNumber = function(a) {
  return"number" == typeof a
};
goog.isFunction = function(a) {
  return"function" == goog.typeOf(a)
};
goog.isObject = function(a) {
  var b = typeof a;
  return"object" == b && null != a || "function" == b
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(a) {
  "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_]
  }catch(b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if("object" == b || "array" == b) {
    if(a.clone) {
      return a.clone()
    }
    var b = "array" == b ? [] : {}, c;
    for(c in a) {
      b[c] = goog.cloneObject(a[c])
    }
    return b
  }
  return a
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, b, c) {
  if(!a) {
    throw Error();
  }
  if(2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c)
    }
  }
  return function() {
    return a.apply(b, arguments)
  }
};
goog.bind = function(a, b, c) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.unshift.apply(b, c);
    return a.apply(this, b)
  }
};
goog.mixin = function(a, b) {
  for(var c in b) {
    a[c] = b[c]
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return+new Date
};
goog.globalEval = function(a) {
  if(goog.global.execScript) {
    goog.global.execScript(a, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ \x3d 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) {
        goog.global.eval(a)
      }else {
        var b = goog.global.document, c = b.createElement("script");
        c.type = "text/javascript";
        c.defer = !1;
        c.appendChild(b.createTextNode(a));
        b.body.appendChild(c);
        b.body.removeChild(c)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
  var c = function(a) {
    return goog.cssNameMapping_[a] || a
  }, d = function(a) {
    a = a.split("-");
    for(var b = [], d = 0;d < a.length;d++) {
      b.push(c(a[d]))
    }
    return b.join("-")
  }, d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
    return a
  };
  return b ? a + "-" + d(b) : d(a)
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
  var c = b || {}, d;
  for(d in c) {
    var e = ("" + c[d]).replace(/\$/g, "$$$$");
    a = a.replace(RegExp("\\{\\$" + d + "\\}", "gi"), e)
  }
  return a
};
goog.getMsgWithFallback = function(a, b) {
  return a
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, c)
};
goog.exportProperty = function(a, b, c) {
  a[b] = c
};
goog.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a
};
goog.base = function(a, b, c) {
  var d = arguments.callee.caller;
  if(goog.DEBUG && !d) {
    throw Error("arguments.caller not defined.  goog.base() expects not to be running in strict mode. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
  }
  if(d.superClass_) {
    return d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1))
  }
  for(var e = Array.prototype.slice.call(arguments, 2), f = !1, g = a.constructor;g;g = g.superClass_ && g.superClass_.constructor) {
    if(g.prototype[b] === d) {
      f = !0
    }else {
      if(f) {
        return g.prototype[b].apply(a, e)
      }
    }
  }
  if(a[b] === d) {
    return a.constructor.prototype[b].apply(a, e)
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
  a.call(goog.global)
};
var smash = {Sphere:function() {
  this.velocityZ = this.velocityY = this.velocityX = this.positionZ = this.positionY = this.positionX = 0.1;
  this.radius = 5.5
}};
smash.Sphere.prototype.step = function(a) {
  this.positionX += this.velocityX * a;
  this.positionY += this.velocityY * a;
  this.positionZ += this.velocityZ * a
};
smash.math = {};
smash.math.square = function(a) {
  return a * a
};
smash.math.vectorDistance = function(a, b, c, d, e, f) {
  return Math.sqrt(smash.math.square(a - d) + smash.math.square(b - e) + smash.math.square(c - f))
};
smash.math.vectorLength = function(a, b, c) {
  return Math.sqrt(smash.math.square(a) + smash.math.square(b) + smash.math.square(c))
};
smash.math.checkCollidingSpheres = function(a, b) {
  return smash.math.vectorDistance(a.positionX, a.positionY, a.positionZ, b.positionX, b.positionY, b.positionZ) < a.radius + b.radius
};
smash.SphereSystem = function() {
  this.spheres = Array(smash.SphereSystem.SPHERES_COUNT);
  for(var a = 0;a < smash.SphereSystem.SPHERES_COUNT;a++) {
    var b = new smash.Sphere;
    b.positionX = 400 * (Math.random() - 0.5);
    b.positionY = 200 * (Math.random() - 0.5);
    b.positionZ = 100 * (Math.random() - 0.5);
    b.velocityX = 1 * (Math.random() - 0.5);
    b.velocityY = 1 * (Math.random() - 0.5);
    b.velocityZ = 1 * (Math.random() - 0.5);
    this.spheres[a] = b
  }
  if(smash.SphereSystem.DRAWING_ENABLED) {
    this.camera = new THREE.PerspectiveCamera(20, smash.SphereSystem.CANVAS_WIDTH / smash.SphereSystem.CANVAS_HEIGHT, 1, 1E4);
    this.camera.position.z = 1E3;
    (new THREE.OrbitControls(this.camera)).addEventListener("change", goog.bind(function() {
      this.renderer.render(this.scene, this.camera)
    }, this));
    this.scene = new THREE.Scene;
    a = new THREE.PointLight(16777215);
    a.position.set(-40, 60, -10);
    this.scene.add(a);
    a = new THREE.AxisHelper(20);
    this.scene.add(a);
    var a = new THREE.PlaneGeometry(1E4, 1E4, 100, 100), c = new THREE.MeshBasicMaterial({color:13421772, wireframe:!0}), a = new THREE.Mesh(a, c);
    a.rotation.x = -0.5 * Math.PI;
    a.position.x = 0;
    a.position.y = smash.SphereSystem.FLOOR_LEVEL;
    a.position.z = 0;
    this.scene.add(a);
    c = new THREE.MeshLambertMaterial({color:16711680});
    this.threeSpheres = Array(smash.SphereSystem.SPHERES_COUNT);
    for(a = 0;a < smash.SphereSystem.SPHERES_COUNT;a++) {
      b = new THREE.SphereGeometry(this.spheres[a].radius, 10, 10), b = new THREE.Mesh(b, c), b.position.x = this.spheres[a].positionX, b.position.y = this.spheres[a].positionY, b.position.z = this.spheres[a].positionZ, this.threeSpheres[a] = b, this.scene.add(b)
    }
    this.renderer = new THREE.WebGLRenderer;
    this.renderer.setSize(smash.SphereSystem.CANVAS_WIDTH, smash.SphereSystem.CANVAS_HEIGHT);
    document.body.appendChild(this.renderer.domElement);
    this.renderer.render(this.scene, this.camera)
  }
};
smash.SphereSystem.SPHERES_COUNT = 50;
smash.SphereSystem.DRAWING_ENABLED = !1;
smash.SphereSystem.GRAVITY_ENABLED = !0;
smash.SphereSystem.GRAVITY_FORCE = 0.1;
smash.SphereSystem.FLOOR_LEVEL = -100;
smash.SphereSystem.FLOOR_FRICTON = 0.8;
smash.SphereSystem.CANVAS_WIDTH = 1200;
smash.SphereSystem.CANVAS_HEIGHT = 400;
smash.SphereSystem.collide = function(a, b) {
  var c = smash.math.vectorLength(a.velocityX, a.velocityY, a.velocityZ) + smash.math.vectorLength(b.velocityX, b.velocityY, b.velocityZ), d = a.positionX - b.positionX, e = a.positionY - b.positionY, f = a.positionZ - b.positionZ, c = smash.math.vectorLength(d, e, f) * c / 2, d = d / c, e = e / c, f = f / c;
  a.velocityX = d;
  a.velocityY = e;
  a.velocityZ = f;
  b.velocityX = -1 * d;
  b.velocityY = -1 * e;
  b.velocityZ = -1 * f
};
smash.SphereSystem.prototype.applyGravity = function(a) {
  smash.SphereSystem.GRAVITY_ENABLED && (a.velocityY -= smash.SphereSystem.GRAVITY_FORCE)
};
smash.SphereSystem.prototype.applyFloor = function(a) {
  a.positionY - a.radius < smash.SphereSystem.FLOOR_LEVEL && (a.velocityY *= -smash.SphereSystem.FLOOR_FRICTON)
};
smash.SphereSystem.prototype.step = function() {
  for(var a = 0;a < smash.SphereSystem.SPHERES_COUNT;a++) {
    this.applyGravity(this.spheres[a]);
    this.applyFloor(this.spheres[a]);
    this.spheres[a].step(1);
    for(var b = 0;b < smash.SphereSystem.SPHERES_COUNT;b++) {
      a != b && smash.math.checkCollidingSpheres(this.spheres[a], this.spheres[b]) && smash.SphereSystem.collide(this.spheres[a], this.spheres[b])
    }
    smash.SphereSystem.DRAWING_ENABLED && (this.threeSpheres[a].position.x = this.spheres[a].positionX, this.threeSpheres[a].position.y = this.spheres[a].positionY, this.threeSpheres[a].position.z = this.spheres[a].positionZ)
  }
  smash.SphereSystem.DRAWING_ENABLED && this.renderer.render(this.scene, this.camera)
};
for(var system = new smash.SphereSystem, i = 0;1E3 > i;i++) {
  system.step()
}
;
