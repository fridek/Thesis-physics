#!/bin/sh
shift  # get rid of the '-c' supplied by make.
echo "Measuring spheres 1 time in JavaScript"
{ time sh -c "browser/static/d8 browser/static/spheres1.js"; } 2> /tmp/spheres1jstime.txt
echo "Measuring spheres 1 time in EmScripten JavaScript"
{ time sh -c "browser/static/d8 emscripten/spheres1.js"; } 2> /tmp/spheres1emtime.txt
echo "Measuring spheres 1 time in C++"
{ time sh -c "runtime/static/spheres1"; } 2> /tmp/spheres1cpptime.txt
time/spheres1.pl
