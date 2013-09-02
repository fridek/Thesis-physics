buildparticlesjs:
	java -jar browser/bin/plovr.jar build browser/bin/plovr-config-compile-particles1.js > browser/static/particles1.js
	java -jar browser/bin/plovr.jar build browser/bin/plovr-config-compile-particles2.js > browser/static/particles2.js

buildspheresjs:
	java -jar browser/bin/plovr.jar build browser/bin/plovr-config-compile-spheres1.js > browser/static/spheres1.js
	java -jar browser/bin/plovr.jar build browser/bin/plovr-config-compile-spheres2.js > browser/static/spheres2.js

buildspheresjs1:
	java -jar browser/bin/plovr.jar build browser/bin/plovr-config-compile-spheres1.js > browser/static/spheres1.js

buildspheresjs2:
	java -jar browser/bin/plovr.jar build browser/bin/plovr-config-compile-spheres2.js > browser/static/spheres2.js

buildjs: buildparticlesjs buildspheresjs

buildparticlescpp:
	g++ runtime/tests/particles1.cpp runtime/engine/particle*.cpp -O3 -static -o runtime/static/particles1
	g++ runtime/tests/particles2.cpp runtime/engine/particle*.cpp -O3 -static -o runtime/static/particles2

buildspherescpp1:
	g++ runtime/tests/spheres1.cpp runtime/engine/math.cpp runtime/engine/sphere*.cpp -O3 -static -o runtime/static/spheres1
buildspherescpp2:
	g++ runtime/tests/spheres2.cpp runtime/engine/math.cpp runtime/engine/octree.cpp runtime/engine/sphere*.cpp -O3 -static -o runtime/static/spheres2

buildcpp: buildparticlescpp buildspherescpp

buildall: buildjs buildcpp

timeparticlesjs:
	time browser/static/d8 browser/static/particles1.js
	time browser/static/d8 browser/static/particles2.js

timespheresjs:
	time browser/static/d8 browser/static/spheres1.js
	time browser/static/d8 browser/static/spheres2.js

timejs: timeparticlesjs timespheresjs
	
timeparticlescpp:
	time runtime/static/particles1
	time runtime/static/particles2

timespherescpp:
	time runtime/static/spheres1

timecpp: timeparticlescpp timespherescpp

timeall: timejs timecpp

lint:
	gjslint --strict --closurized_namespaces="goog,smash" browser/engine/*.js browser/tests/*.js

fixjs:
	fixjsstyle --strict --closurized_namespaces="goog,smash" browser/engine/*.js browser/tests/*.js
