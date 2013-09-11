#!/bin/sh
shift  # get rid of the '-c' supplied by make.
echo "Measuring spheres 2 time in JavaScript"
{ time sh -c "browser/static/d8 browser/static/spheres2.js"; } 2> /tmp/spheres2jstime.txt
echo "Measuring spheres 2 time in EmScripten JavaScript"
{ time sh -c "browser/static/d8 emscripten/spheres2.js"; } 2> /tmp/spheres2emtime.txt
echo "Measuring spheres 2 time in C++"
{ time sh -c "runtime/static/spheres2"; } 2> /tmp/spheres2cpptime.txt
time/spheres2.pl
