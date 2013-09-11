GCCFLAGS=-O3 -static
EMCCFLAGS=-O2 --closure 1

buildparticlesjs1:
	java -jar browser/bin/plovr.jar build browser/bin/plovr-config-compile-particles1.js > browser/static/particles1.js

buildparticlesjs2:
	java -jar browser/bin/plovr.jar build browser/bin/plovr-config-compile-particles2.js > browser/static/particles2.js

buildparticlesjs: buildparticlesjs1 buildparticlesjs2

buildspheresjs1:
	java -jar browser/bin/plovr.jar build browser/bin/plovr-config-compile-spheres1.js > browser/static/spheres1.js

buildspheresjs2:
	java -jar browser/bin/plovr.jar build browser/bin/plovr-config-compile-spheres2.js > browser/static/spheres2.js

buildspheresjs: buildspheresjs1 buildspheresjs2

buildjs: buildparticlesjs buildspheresjs

buildparticlescpp1:
	g++ runtime/tests/particles1.cpp runtime/engine/particle*.cpp $(GCCFLAGS) -o runtime/static/particles1
buildparticlescpp2:
	g++ runtime/tests/particles2.cpp runtime/engine/particle*.cpp $(GCCFLAGS) -o runtime/static/particles2

buildparticlescpp: buildparticlescpp1 buildparticlescpp2

buildspherescpp1:
	g++ runtime/tests/spheres1.cpp runtime/engine/math.cpp runtime/engine/sphere.cpp runtime/engine/sphereSystem.cpp $(GCCFLAGS) -o runtime/static/spheres1
buildspherescpp2:
	g++ runtime/tests/spheres2.cpp runtime/engine/math.cpp runtime/engine/octree.cpp runtime/engine/sphere*.cpp $(GCCFLAGS) -o runtime/static/spheres2

buildspherescpp: buildspherescpp1 buildspherescpp2

buildcpp: buildparticlescpp buildspherescpp


buildparticlesem1:
	emcc runtime/tests/particles1.cpp runtime/engine/particle*.cpp $(EMCCFLAGS) -o emscripten/particles1.js
buildparticlesem2:
	emcc runtime/tests/particles2.cpp runtime/engine/particle*.cpp $(EMCCFLAGS) -o emscripten/particles2.js

buildparticlesem: buildparticlesem1 buildparticlesem2

buildspheresem1:
	emcc runtime/tests/spheres1.cpp runtime/engine/math.cpp runtime/engine/sphere.cpp runtime/engine/sphereSystem.cpp $(EMCCFLAGS) -o emscripten/spheres1.js
buildspheresem2:
	emcc runtime/tests/spheres2.cpp runtime/engine/math.cpp runtime/engine/octree.cpp runtime/engine/sphere*.cpp $(EMCCFLAGS) -o emscripten/spheres2.js

buildspheresem: buildspheresem1 buildspheresem2

buildem: buildparticlesem buildspheresem

buildall: buildjs buildcpp buildem

timeparticles1:
	time/particles1.sh

timeparticles2:
	time/particles2.sh

timespheres1:
	time/spheres1.sh

timespheres2:
	time/spheres2.sh

timeall: timeparticles1 timeparticles2 timespheres1 timespheres2

build_and_test: buildall timeall

lint:
	gjslint --strict --closurized_namespaces="goog,smash" browser/engine/*.js browser/tests/*.js

fixjs:
	fixjsstyle --strict --closurized_namespaces="goog,smash" browser/engine/*.js browser/tests/*.js
