buildjs:
	java -jar browser/bin/plovr.jar build browser/bin/plovr-config-compile-particles1.js > browser/static/particles1.js
	java -jar browser/bin/plovr.jar build browser/bin/plovr-config-compile-particles2.js > browser/static/particles2.js
buildcpp:
	g++ runtime/tests/particles1.cpp runtime/engine/particle*.cpp -O3 -o runtime/static/particles1
	g++ runtime/tests/particles2.cpp runtime/engine/particle*.cpp -O3 -o runtime/static/particles2
buildall: buildjs buildcpp

timejs:
	time browser/static/d8 browser/static/particles1.js
	time browser/static/d8 browser/static/particles2.js
	
timecpp:
	time runtime/static/particles1
	time runtime/static/particles2

timeall: timejs timecpp

lint:
	gjslint --strict --closurized_namespaces="goog,smash" browser/engine/*.js browser/tests/*.js

fixjs:
	fixjsstyle --strict --closurized_namespaces="goog,smash" browser/engine/*.js browser/tests/*.js
