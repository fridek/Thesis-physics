This project aim to implement common subsystems of physics engines using C++ and JavaScript.
Then C++ is cross-compiled to JavaScript using EmScripten and all three versions are compared time-wise.

To run benchmarks have g++ installed for C++ tests and V8 for JS. Build V8 from source and put d8 in browser/static.
To build latest V8 with new g++ use ```make native werror=no```
Process described in details on https://code.google.com/p/v8/wiki/BuildingWithGYP

To build all tests you need g++, emcc (EmScripten) and plovr (plovr.jar in browser/bin/).
https://github.com/kripken/emscripten
https://github.com/bolinfest/plovr


Latest results from make build_and_test:

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