#!/bin/sh
shift  # get rid of the '-c' supplied by make.
echo "Measuring particles 2 time in JavaScript"
{ time sh -c "browser/static/d8 browser/static/particles2.js"; } 2> /tmp/particles2jstime.txt
echo "Measuring particles 2 time in EmScripten JavaScript"
{ time sh -c "browser/static/d8 emscripten/particles2.js"; } 2> /tmp/particles2emtime.txt
echo "Measuring particles 2 time in C++"
{ time sh -c "runtime/static/particles2"; } 2> /tmp/particles2cpptime.txt
time/particles2.pl
