This project aims to implement common subsystems of physics engines using C++ and JavaScript.
Then C++ is cross-compiled to JavaScript using EmScripten and all three versions are compared time-wise.
Demo of Octree-partitioned space with 1K spheres colliding available at http://fridek.github.io/Thesis-physics/

To run benchmarks, you need g++ for C++ tests and V8 for JS. Build V8 from source and put d8 in browser/static for best performance - packages in repositories are outdated.
To build latest V8 with g++ 4.8 use ```make native werror=no```, otherwise plain ```make native``` is enough.
Process described in details on https://code.google.com/p/v8/wiki/BuildingWithGYP
Makefile rule for benchmarks is ```make timeall```.

To build all tests you need g++, emcc (EmScripten) and plovr (plovr.jar in browser/bin/).
https://github.com/kripken/emscripten
https://github.com/bolinfest/plovr
Makefile rule for compilation and benchmark is ```make build_and_test```.

Latest results from ```make timeall``` on my platform:

Fedora 19, Intel i7 2670QM, 4GB RAM, g++ 4.8.1
```
time/particles1.sh
JavaScript time: 19.51s 508.48% slower
Emscripten JavaScript time: 4.85s 51.28% slower
C++ time: 3.21s [FASTEST]

time/particles2.sh
JavaScript time: 4.96s 203.49% slower
Emscripten JavaScript time: 5.10s 212.06% slower
C++ time: 1.63s [FASTEST]

time/spheres1.sh
JavaScript time: 9.02s 81.92% slower
Emscripten JavaScript time: 12.35s 148.99% slower
C++ time: 4.96s [FASTEST]

time/spheres2.sh
JavaScript time: 14.14s 311.20% slower
Emscripten JavaScript time: 11.20s 225.71% slower
C++ time: 3.44s [FASTEST]
```

Windows 7, Intel i7 2670QM, 4GB RAM, g++ 4.7.3, Cygwin
```
time/particles1.sh
JavaScript time: 20.77s 491.96% slower
Emscripten JavaScript time: 6.46s 84.09% slower
C++ time: 3.51s [FASTEST]

time/particles2.sh
JavaScript time: 3.47s 102.57% slower
Emscripten JavaScript time: 5.57s 225.72% slower
C++ time: 1.71s [FASTEST]

time/spheres1.sh
JavaScript time: 10.81s 13.52% slower
Emscripten JavaScript time: 11.82s 24.15% slower
C++ time: 9.52s [FASTEST]

time/spheres2.sh
JavaScript time: 16.95s 20.19% slower
Emscripten JavaScript time: 17.79s 26.14% slower
C++ time: 14.10s [FASTEST]
```
